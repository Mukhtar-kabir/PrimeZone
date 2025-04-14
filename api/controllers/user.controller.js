import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";
import PDFDocument from "pdfkit";
// import PDFDocument from "pdfkit";
// import Listing from "../models/listing.model.js";

export const test = (req, res) => {
  res.json({
    message: "API route is working!",
  });
};

export const UpdateUser = async (req, res, next) => {
  // Check if the user is attempting to update their own account
  if (req.user.id !== req.params.id && !req.user.isAdmin) {
    return next(
      errorHandler(401, "You can only update your own account or be an admin!")
    );
  }

  try {
    // Only hash the password if it's provided in the request body
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // If the request is made by a regular user, allow only avatar update
    if (!req.user.isAdmin) {
      // Allow updating only avatar for regular users
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            avatar: req.body.avatar,
          },
        },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
      }

      const { password, ...rest } = updatedUser._doc;
      return res.status(200).json(rest);
    }

    // If it's an admin, allow updating all fields
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

// export const UpdateUser = async (req, res, next) => {
//   if (req.user.id !== req.params.id)
//     return next(errorHandler(401, "You can only update your own account!"));

//   try {
//     if (req.body.password) {
//       req.body.password = bcryptjs.hashSync(req.body.password, 10);
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           username: req.body.username,
//           email: req.body.email,
//           phoneNumber: req.body.phoneNumber,
//           password: req.body.password,
//           avatar: req.body.avatar,
//         },
//       },
//       { new: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const { password, ...rest } = updatedUser._doc;
//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only delete your own account!"));

  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User has been deleted!");
  } catch (error) {
    next(error);
  }
};

export const addProperty = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found"));

    const newProperty = {
      name: req.body.username,
      location: req.body.location,
      plotSize: req.body.plotSize,
      type: req.body.type,
      price: req.body.price,
      numberOfPlot: req.body.numberOfPlot,
      plotNumber: req.body.plotNumber,
      paymentStatus: req.body.paymentStatus,
      imageUrl: req.body.imageUrl,
    };

    user.properties.push(newProperty);
    await user.save();
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const addPayment = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return next(errorHandler(404, "User not found"));

    const newPayment = {
      propertyId: req.body.propertyId,
      amount: req.body.amount,
      date: new Date(),
      status: req.body.status,
      receiptUrl: req.body.receiptUrl,
    };

    user.paymentHistory.push(newPayment);
    if (newPayment.status === "Paid") {
      const unpaidProperty = user.properties.find(
        (prop) => prop.paymentStatus !== "Paid"
      );
      if (unpaidProperty) unpaidProperty.paymentStatus = "Paid";
    }
    // if (newPayment.status === "Paid") {
    //   // Update the user's property payment status if the payment was successful
    //   user.properties.forEach((property) => {
    //     if (property.paymentStatus === "Installments Remaining") {
    //       property.paymentStatus = "Paid";
    //     }
    //   });
    // }
    await user.save();
    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

// In user.controller.js

export const getPaymentHistory = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("paymentHistory");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user.paymentHistory);
  } catch (error) {
    next(error);
  }
};

export const assignPropertyToUser = async (req, res, next) => {
  const { emailOrPhone } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: emailOrPhone }, { phoneNumber: emailOrPhone }],
    });

    if (!user) return next(errorHandler(404, "User not found"));

    const newProperty = {
      name: req.body.name,
      location: req.body.location,
      plotSize: req.body.plotSize,
      type: req.body.type,
      price: req.body.price,
      plotNumber: req.body.plotNumber,
      numberOfPlot: req.body.numberOfPlot,
      paymentStatus: req.body.paymentStatus,
      imageUrl: req.body.imageUrl,
    };

    user.properties.push(newProperty);
    await user.save();

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).populate("properties");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const generateReceipt = async (req, res, next) => {
  try {
    const { userId, propertyId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const property = user.properties.find(
      (p) => p._id.toString() === propertyId
    );
    if (!property) return res.status(404).json({ error: "Property not found" });

    const payment = user.paymentHistory.find(
      (p) => p.propertyId?.toString() === propertyId && p.status === "Paid"
    );

    if (!payment) return res.status(404).json({ error: "Payment not found" });

    // Create PDF document
    const doc = new PDFDocument();

    // Set headers
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=receipt-${property.name}.pdf`
    );

    // Pipe PDF stream to response
    doc.pipe(res);

    // PDF content
    doc.fontSize(18).text("Payment Receipt", { align: "center" });
    doc.moveDown();
    doc.fontSize(12).text(`Name: ${user.username}`);
    doc.text(`Email: ${user.email}`);
    doc.text(`Phone: ${user.phoneNumber}`);
    doc.text(`Property: ${property.name}`);
    doc.text(`Location: ${property.location}`);
    doc.text(`Amount Paid: ₦${payment.amount}`);
    doc.text(`Date: ${new Date(payment.date).toLocaleDateString()}`);
    doc.text(`Status: ${payment.status}`);
    doc.moveDown();
    doc.text("Thank you for your payment!", { align: "center" });

    doc.end(); // Finalize PDF
  } catch (err) {
    next(err);
  }
};

// GET /api/users/:id
export const getUsers = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("properties");
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(errorHandler(404, "User not found!"));

    const { password: pass, ...rest } = user._doc;

    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

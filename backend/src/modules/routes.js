const express = require("express");
const authRouter = require("./auth/auth.routes");
const usersRouter = require("./users/users.routes");
const doctorRouter = require("./doctors/doctor.routes");
const scheduleRouter = require("./schedules/schedule.routes");
const queueRouter = require("./queue/queue.routes");
const notificationRouter = require("./notifications/notification.routes");
const patientRouter = require("./patients/patient.routes");

const apiRouter = express.Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/doctors", doctorRouter);
apiRouter.use("/schedules", scheduleRouter);
apiRouter.use("/queue", queueRouter);
apiRouter.use("/notifications", notificationRouter);
apiRouter.use("/patients", patientRouter);

module.exports = apiRouter;

import express from "express";
import authRouter from "./auth/auth.routes.js";
import usersRouter from "./users/users.routes.js";
import doctorRouter from "./doctors/doctor.routes.js";
import scheduleRouter from "./schedules/schedule.routes.js";
import queueRouter from "./queue/queue.routes.js";
import notificationRouter from "./notifications/notification.routes.js";
import patientRouter from "./patients/patient.routes.js";

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

export default apiRouter;
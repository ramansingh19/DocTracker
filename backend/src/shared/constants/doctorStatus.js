const DOCTOR_STATUS = {
  IN_TRANSIT: "in_transit",
  CONSULTING: "consulting",
  IN_OT: "in_ot",
  ARRIVED: "arrived",
  DELAYED: "delayed",
};

const doctorStatusValues = Object.values(DOCTOR_STATUS);

export {
  DOCTOR_STATUS,
  doctorStatusValues,
};
import jwt from "jsonwebtoken";

export const checkAdmin = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.status(400).json({ message: "Fail" });

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") return res.status(400).json({ message: "Fail" });

  jwt.verify(token, process.env.NEXT_APP_ENV_SECRET, (err, data) => {
    if (err) return res.status(400).json({ message: "Fail" });

    if (data.role == "admin") return next();
    else return res.status(400).json({ message: "Fail" });
  });
};

export const onlyAdmin = async (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) return res.sendStatus(403);

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") return res.sendStatus(403);

  jwt.verify(token, process.env.NEXT_APP_ENV_SECRET, (err, data) => {
    if (err) return res.sendStatus(403);

    if (data.role === "admin") {
      return next();
    } else {
      return res.sendStatus(403);
    }
  });
};

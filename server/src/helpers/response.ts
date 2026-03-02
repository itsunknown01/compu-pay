import { Response } from "express";

export const sendSuccess = (
  res: Response,
  message: string,
  data?: any,
  statusCode: number = 200,
) => {
  return res.status(statusCode).json({ message, data });
};

export const sendCreated = (res: Response, message: string, data?: any) => {
  return sendSuccess(res, message, data, 201);
};

export const sendBadRequest = (
  res: Response,
  message: string,
  errors?: any,
) => {
  const payload: any = { error: message };
  if (errors) payload.errors = errors;
  return res.status(400).json(payload);
};

export const sendUnauthorized = (
  res: Response,
  message: string = "Unauthorized",
) => {
  return res.status(401).json({ error: message });
};

export const sendForbidden = (res: Response, message: string = "Forbidden") => {
  return res.status(403).json({ error: message });
};

export const sendNotFound = (res: Response, message: string = "Not Found") => {
  return res.status(404).json({ error: message });
};

export const sendServerError = (
  res: Response,
  message: string = "Internal Server Error",
  error?: any,
) => {
  console.error(`[Server Error] ${message}:`, error);
  return res.status(500).json({ error: message });
};

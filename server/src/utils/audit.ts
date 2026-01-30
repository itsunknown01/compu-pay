import prisma from "./prisma";

export interface AuditDetails {
  [key: string]: any;
}

export const logAction = async (
  tenantId: string,
  userId: string | null,
  action: string,
  resourceType: string,
  resourceId: string,
  details?: AuditDetails,
  ipAddress?: string,
) => {
  try {
    await prisma.auditLog.create({
      data: {
        tenantId,
        userId,
        action,
        resourceType,
        resourceId,
        details: details || {},
        ipAddress,
      },
    });
  } catch (error) {
    // Audit logging should not crash the main flow, but must be reported
    console.error("FAILED TO LOG AUDIT:", error);
  }
};

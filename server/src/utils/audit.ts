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
    
    console.error("FAILED TO LOG AUDIT:", error);
  }
};

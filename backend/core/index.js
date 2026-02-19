// Database exports
export { prisma } from './src/database';
export * from './src/database/repositories/user-repository';
export * from './src/database/repositories/campaign-repository';

// Service exports
export { AuthService } from './src/services/auth/auth-service';
export { PermissionService } from './src/services/auth/permission-service';
export { CampaignService } from './src/services/campaign/campaign-service';

// AI exports
// export { MatchingEngine } from './src/ai/engine'; 
// (Export other AI logic as needed)

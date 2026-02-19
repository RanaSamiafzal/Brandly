import jwt from 'jsonwebtoken';

const SECRET = process.env.AUTH_SECRET || 'dev_secret';

/**
 * Role-based permission definitions.
 * Maps role names to arrays of allowed actions.
 */
const ROLE_PERMISSIONS = {
    ADMIN: [
        'manage:users',
        'manage:campaigns',
        'manage:influencers',
        'manage:brands',
        'view:analytics',
        'manage:payments',
        'moderate:content',
    ],
    BRAND: [
        'create:campaign',
        'view:campaign',
        'view:matches',
        'manage:brand_profile',
        'invite:influencer',
    ],
    INFLUENCER: [
        'view:invites',
        'accept:invite',
        'reject:invite',
        'manage:influencer_profile',
        'view:earnings',
    ],
};

export const PermissionService = {
    /**
     * Check if a role has a specific permission.
     * @param {string} roleName - e.g. 'BRAND', 'INFLUENCER', 'ADMIN'
     * @param {string} permission - e.g. 'create:campaign'
     * @returns {boolean}
     */
    hasPermission(roleName, permission) {
        const perms = ROLE_PERMISSIONS[roleName];
        if (!perms) return false;
        return perms.includes(permission);
    },

    /**
     * Extract role from a JWT token and check permission.
     * @param {string} token - JWT token
     * @param {string} permission - Required permission string
     * @returns {{ allowed: boolean, decoded: object|null }}
     */
    authorize(token, permission) {
        try {
            const decoded = jwt.verify(token, SECRET);
            const allowed = this.hasPermission(decoded.role, permission);
            return { allowed, decoded };
        } catch (error) {
            return { allowed: false, decoded: null };
        }
    },

    /**
     * Get all permissions for a role.
     * @param {string} roleName
     * @returns {string[]}
     */
    getPermissions(roleName) {
        return ROLE_PERMISSIONS[roleName] || [];
    },
};

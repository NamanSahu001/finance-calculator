import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export interface AuthRequest extends Request {
    user?: {
        id: number;
        user_type: string;
    };
}

export const authenticateToken = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: 'Authentication token required' });
            return;
        }

        const payload = AuthService.verifyToken(token);
        req.user = {
            id: payload.id,
            user_type: payload.user_type
        };
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid or expired token' });
    }
};

export const authorizeUserType = (allowedTypes: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (!req.user) {
            res.status(401).json({ message: 'Authentication required' });
            return;
        }

        if (!allowedTypes.includes(req.user.user_type)) {
            res.status(403).json({ message: 'Insufficient permissions' });
            return;
        }

        next();
    };
}; 
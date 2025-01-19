import express, {Request, Response, NextFunction} from 'express';
import '@dotenvx/dotenvx/config';
import {searchImage} from './services/imageService';
import {downloadImage} from './utils/downloadImage';
import { SearchLensError } from './exceptions/searchLensError';

const app = express();
const PORT = process.env.PORT ?? 3000;

/**
 * Route to retrieve a PNG image of a specific product.
 * Example: GET /:product/image.png
 */
app.get(
    '/:product/image.png',
    async (req: Request<{ product: string }>, res: Response, next: NextFunction): Promise<void> => {
        try {
            const productName = req.params.product;

            if (!productName) {
                res.status(400).send('Le nom du produit est requis.');
                return;
            }

            const imageUrl = await searchImage(productName);
            if (!imageUrl) {
                res.status(404).send('Image non trouvée.');
                return;
            }

            await downloadImage(imageUrl, res);
        } catch (error) {
            next(error);
        }
    }
);

// Global middleware to handle errors
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof SearchLensError) {
        console.error('SearchLens error:', err);
        res.status(err.statusCode).send(err.message);
    } else {
        console.error('Unknown error:', err);
        res.status(500).send('Internal server error.');
    }
});

// Server Startup
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

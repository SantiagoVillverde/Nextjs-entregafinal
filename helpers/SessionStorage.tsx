import { ICart } from "@/interfaces/ICart";

export const saveCartInSessionStorage = (key: string, item: ICart): void => {
    if (typeof window !== 'undefined') {
        sessionStorage.setItem(key, JSON.stringify(item));
    }
}

export const getCartFromSessionStorage = (key: string): ICart | null => {
    if (typeof window !== 'undefined') {
        const storedItem = sessionStorage.getItem(key);
        if (storedItem) {
            try {
                const parsedCart: ICart = JSON.parse(storedItem);
                if ('items' in parsedCart && 'totalPayment' in parsedCart) {
                    return parsedCart;
                } else {
                    console.log('Invalid cart data in sessionStorage.');
                }
            } catch (error) {
                console.log('Error parsing cart data from sessionStorage:', error);
            }
        }
    }
    return null;
};

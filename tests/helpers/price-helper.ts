import { Locator } from '@playwright/test';

export function parsePrice(text: string | null): number {
    const cleaned = text?.replace(/[^0-9.]/g, '') ?? '0';
    return Number(cleaned);
}

export async function getPriceFromLocator(locator: Locator): Promise<number> {
    const text = await locator.textContent();
    return parsePrice(text);
}

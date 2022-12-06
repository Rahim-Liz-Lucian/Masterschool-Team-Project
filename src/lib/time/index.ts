const DAY_MILLISECONDS = 1_000 * 3_600 * 24;
const LOCALES_CA = "en-CA";
const UNIT = "days";

export const formatDate = (date = new Date(), locales = LOCALES_CA) => {
    return date.toLocaleDateString(locales);
};

export const formatRelativeDate = (date = new Date(), dateFormatter = new Intl.RelativeTimeFormat(LOCALES_CA, { style: 'narrow' })) => {
    return dateFormatter.format(Math.round((date.getTime() - Date.now()) / DAY_MILLISECONDS), UNIT);
};

export const futureDate = (days: number) => {
    return new Date(new Date().setDate(new Date().getDate() + days)).toLocaleDateString(LOCALES_CA);
};

export const formatDate = (date = new Date(), locales = "en-CA") => {
    return date.toLocaleDateString(locales);
};

export const formatRelativeDate = (date = new Date(), dateFormatter = new Intl.RelativeTimeFormat('en', { style: 'narrow' })) => {
    return dateFormatter.format(Math.round((date.getTime() - Date.now()) / (1_000 * 3_600 * 24)), "days");
};

export const futureDate = (days) => {
    return new Date(new Date().setDate(new Date().getDate() + days)).toLocaleDateString("en-CA");
};

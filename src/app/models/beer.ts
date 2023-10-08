export interface Beer {
    id: number;
    name: string;
    tagline: string;
    first_brewed: string;
    description: string;
    image_url: string;
    abv: number; // Alcohol by volume
    ibu: number; // International Bitterness Units
    target_fg: number; // Target Final Gravity
    target_og: number; // Target Original Gravity
    ebc: number; // European Brewery Convention color
    srm: number; // Standard Reference Method color
    ph: number; // pH level
    attenuation_level: number;
    volume: {
        value: number;
        unit: string;
    };
    boil_volume: {
        value: number;
        unit: string;
    };
    method: {
        mash_temp: [
            {
                temp: {
                    value: number;
                    unit: string;
                };
                duration: number | null;
            }
        ];
        fermentation: {
            temp: {
                value: number;
                unit: string;
            };
        };
        twist: string | null;
    };
    ingredients: {
        malt: [
            {
                name: string;
                amount: {
                    value: number;
                    unit: string;
                };
            }
        ];
        hops: [
            {
                name: string;
                amount: {
                    value: number;
                    unit: string;
                };
                add: string;
                attribute: string;
            }
        ];
        yeast: string;
    };
    food_pairing: string[];
    brewers_tips: string;
    contributed_by: string;
}

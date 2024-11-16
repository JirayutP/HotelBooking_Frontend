import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HotelCatalog from "@/components/HotelCatalog";
import Card from "@/components/Card";

const ratingReducer = (ratingList: Map<string, number>, action: { type: string, hotelName: string, rating: number }) => {
    switch (action.type) {
        case 'update': {
            if (action.rating == null) {
                action.rating = 0;
            }
            return new Map(ratingList.set(action.hotelName, action.rating));
        }
        case 'remove': {
            ratingList.delete(action.hotelName);
            return new Map(ratingList);
        }
        default: return ratingList;
    }
};

const compareReducer = (compareList: Set<string>, action: { type: string, hotelName: string }) => {
    switch (action.type) {
        case 'add': {
            return new Set(compareList.add(action.hotelName));
        }
        case 'remove': {
            compareList.delete(action.hotelName);
            return new Set(compareList);
        }
        default: return compareList;
    }
};

jest.mock('react', () => ({
    ...jest.requireActual('react'),
    useReducer: (reducer: any, initialState: any) => {
        if (reducer === ratingReducer) {
            return [new Map<string, number>(), jest.fn()];
        }
        if (reducer === compareReducer) {
            return [new Set<string>(), jest.fn()];
        }
        return [initialState, jest.fn()];
    }
}));

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            prefetch: () => null
        }
    }
}));

jest.mock('next-auth/react', () => ({
    useSession() {
        return { data: null, user: { name: 'Tester' } }
    }
}));

const mockResult = {
    "success": true,
    "count": 4,
    "pagination": {},
    "data": [
        {
            "_id": "672a3079e2184c06771ad940",
            "name": "Sinae Phuket",
            "address": "888, Ratsada",
            "district": "Mueang Phuket",
            "province": "Phuket",
            "postalcode": "83000",
            "tel": "076390388",
            "picture": "https://drive.google.com/uc?export=download&id=1tCa2bcfRWZZ5wT3uvaj6ZLEo4x3kpsk_",
            "__v": 0,
            "id": "672a3079e2184c06771ad940"
        },
        {
            "_id": "6734be8b7ad19f59f729ffe0",
            "name": "U Nimman Chiang Mai",
            "address": "Nimmana Haeminda Rd Lane 1, Suthep",
            "district": "Mueang Chiang Mai",
            "province": " Chiang Mai",
            "postalcode": "50200",
            "tel": "052005111",
            "picture": "https://drive.google.com/uc?export=download&id=1gJo0zz6qNaSaodJ_fjuMgwUNl4Kt5MP0",
            "__v": 0,
            "id": "6734be8b7ad19f59f729ffe0"
        },
        {
            "_id": "6734bef27ad19f59f729ffe3",
            "name": "Grande Centre Point Sukhumvit 55",
            "address": "300 Thong Lo, Khlong Tan Nuea",
            "district": "Watthana",
            "province": "Bangkok ",
            "postalcode": "10110",
            "tel": "020208000",
            "picture": "https://drive.google.com/uc?export=download&id=1DEXepvG3pWTfDh-DqZ4SAIZAm8tU_8A2",
            "__v": 0,
            "id": "6734bef27ad19f59f729ffe3"
        },
        {
            "_id": "6734bf017ad19f59f729ffe5",
            "name": "a",
            "address": "a",
            "district": "a",
            "province": "a",
            "postalcode": "a",
            "tel": "a",
            "picture": "https://drive.google.com/uc?export=download&id=1gJo0zz6qNaSaodJ_fjuMgwUNl4Kt5MP0",
            "__v": 0,
            "id": "6734bf017ad19f59f729ffe5"
        }
    ]
};

describe("HotelCatalog with Card", () => {
    it("Displays the correct number of hotels and counts in catalog", async () => {
        const hotels = await HotelCatalog({ hotelJson: Promise.resolve(mockResult) });
        render(hotels);

        await waitFor(() => {
            const catalogText = screen.getByText(/Explore 4 hotels in our catalog/i);
            expect(catalogText).toBeInTheDocument();
            const hotelImages = screen.getAllByRole("img");
            expect(hotelImages.length).toBe(4);
        });
    });

    it("Each hotel cards must have compare button and init compare list must be 0", async () => {
        const hotels = await HotelCatalog({ hotelJson: Promise.resolve(mockResult) });
        render(hotels);

        await waitFor(() => expect(screen.getByText("Compare List: 0")).toBeInTheDocument());

        const compareButtons = screen.getAllByText("Compare");
        expect(compareButtons.length).toBe(4);
    });

    it("Each hotel cards must have ratings component (5 stars) and init rating list must be 0", async () => {
        const hotels = await HotelCatalog({ hotelJson: Promise.resolve(mockResult) });
        render(hotels);

        await waitFor(() => expect(screen.getByText("Hotel List with Ratings : 0")).toBeInTheDocument());

        const rateButtons = screen.getAllByLabelText(/Star/);
        expect(rateButtons.length).toBe(20);
    });

    it("Each hotel cards must have correct href for hotel links", async () => {
        const hotels = await HotelCatalog({ hotelJson: Promise.resolve(mockResult) });
        render(hotels);

        await waitFor(() => {
            const hotelLinks = screen.getAllByRole("link");
            expect(hotelLinks.length).toBe(4);
            expect(hotelLinks[0]).toHaveAttribute("href", "/hotel/672a3079e2184c06771ad940");
            expect(hotelLinks[1]).toHaveAttribute("href", "/hotel/6734be8b7ad19f59f729ffe0");
            expect(hotelLinks[2]).toHaveAttribute("href", "/hotel/6734bef27ad19f59f729ffe3");
            expect(hotelLinks[3]).toHaveAttribute("href", "/hotel/6734bf017ad19f59f729ffe5");
        });
    });
});

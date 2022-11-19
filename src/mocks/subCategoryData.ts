import { SUBCATEGORY_DATA_TYPE } from "@/models/bop500";

class SubCategoryApi {
  getCities(): Promise<SUBCATEGORY_DATA_TYPE[]> {
    const cities: SUBCATEGORY_DATA_TYPE[] = [
      {
        id: "1",
        subcategoryName: "Public Library",
        address: "7-9 Blackfen Rd, Sidcup DA15 9LU, United Kingdom",
        allSubcategoryName: "Library",
        title: "Blackfen Community Library",
        city: "Sidcup",
        rank: 3,
        ratingCount: 99,
        rating: 4.9,
        temporaryClosed: 75,
      },
      {
        id: "12",
        subcategoryName: "Public Library",
        address: "260 Commercial Rd, London E1 2FB, United Kingdom",
        allSubcategoryName: "Book store DVD store, Studying center",
        title: "Idea Store Wantney Market",
        city: "Welling",
        rank: 13,
        ratingCount: 68,
        rating: 5,
        temporaryClosed: 53,
      },
    ];

    return Promise.resolve(cities);
  }
}

export const subCategoryApi = new SubCategoryApi();

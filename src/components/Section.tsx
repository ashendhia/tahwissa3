import { Site, Wilaya } from "@prisma/client";
import { Card, CardSpecial, CardLodging } from "./Card";
import Carousel from "./Carousel";
import { RegionWithWilayas } from "~/types";

export const SectionPlaces = ({
  section,
  data,
  wilaya,
  regionId,
}: {
  section: string;
  data: Site[];
  wilaya: Wilaya;
  regionId: number;
}) => {
  if (!data) return null;

  return (
    <section id="Must">
      <Carousel
        element="must"
        section={section}
        perView={4}
        total={data.length}
      >
        {data.map((item, index: React.Key | null | undefined) => {
          return (
            <Card
              key={index}
              element={{
                name: item.name,
                location: `${wilaya.name}, ${wilaya.name} province`,
              }}
              img={`https://ik.imagekit.io/vaqzdpz5y/assets/images/${regionId}/${wilaya.id}/${item.id}/1.png`}
            />
          );
        })}
      </Carousel>
    </section>
  );
};

export const TopSites = ({
  section,
  data,
  regions,
}: {
  section: string;
  data: Site[];
  regions: RegionWithWilayas[];
}) => {
  return (
    <section id="Must">
      <Carousel
        element="must"
        section={section}
        perView={4}
        total={data.length}
      >
        {data.map((item, index: React.Key | null | undefined) => {
          let regionFound: RegionWithWilayas | undefined;
          let wilaya: any;
          let condition = false;

          regions.map((region) => {
            for (const regionWilaya of region.wilayas) {
              if (regionWilaya.id === item.wilayaId && !condition) {
                regionFound = region;
                wilaya = regionWilaya;
                condition = true;
                break;
              }
            }
          });

          return (
            <CardSpecial
              region={regionFound!}
              wilaya={wilaya!}
              key={index}
              element={{
                name: item.name,
                location: `${wilaya!.name}, ${wilaya!.name} province`,
              }}
              img={`https://ik.imagekit.io/vaqzdpz5y/assets/images/${regionFound?.id!}/${
                wilaya!.id
              }/${item.id}/1.png`}
            />
          );
        })}
      </Carousel>
      {/**/}
    </section>
  );
};

export const SectionHotels = ({
  section,
  data,
  wilayaName,
}: {
  section: string;
  data: any;
  wilayaName: string;
}) => {
  if (!data) return null;

  return (
    <section id="Hotels">
      <Carousel
        element="hotels"
        section={section}
        perView={4}
        total={data.length}
      >
        {data.map((lodging: any, index: React.Key | null | undefined) => {
          let imageLink = "";
          if (lodging.photos)
            imageLink = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=5480&photo_reference=${lodging.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
          else imageLink = "https://ik.imagekit.io/vaqzdpz5y/assets/hotel.png";

          return (
            <CardLodging
              key={index}
              element={{
                name: lodging.name,
                location: `${wilayaName}, ${wilayaName} province`,
                link: lodging.link || null,
              }}
              img={imageLink}
            />
          );
        })}
      </Carousel>
    </section>
  );
};

export const SectionRestaurants = ({
  section,
  data,
  wilayaName,
}: {
  section: string;
  data: any;
  wilayaName: string;
}) => {
  if (!data) return null;

  return (
    <section id="Restaurants">
      <Carousel
        element="restaurants"
        section={section}
        perView={4}
        total={data.length}
      >
        {data.map((lodging: any, index: React.Key | null | undefined) => {
          let imageLink = "";
          if (lodging.photos)
            imageLink = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=5480&photo_reference=${lodging.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;
          else
            imageLink =
              "https://ik.imagekit.io/vaqzdpz5y/assets/restaurant.png";

          return (
            <CardLodging
              key={index}
              element={{
                name: lodging.name,
                location: `${wilayaName}, ${wilayaName} province`,
                link: lodging.link || null,
              }}
              img={imageLink}
            />
          );
        })}
      </Carousel>
    </section>
  );
};

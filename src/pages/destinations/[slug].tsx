import { useState, useCallback, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectRegionsState, getAllRegions } from "../../store/regionsReducer";
import { useAppDispatch } from "~/hooks";
import { useStateRef } from "~/hooks";
import { useRouter } from "next/router";
import Link from "next/link";

import * as d3 from "d3";
import { unknown } from "zod";

const WilayasMap = ({ region }: { region: any }) => {
  const [wilayas, setWilayas] = useState<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [left, setLeft] = useState(0);
  const [back, setBack] = useState(false);
  const [forward, setForward] = useState(true);
  const sectionRef = useRef<HTMLUListElement>(null);
  const render = useRef(0);

  const goBack = () => {
    setCurrentIndex(currentIndex - 1);
    if (sectionRef.current) {
      sectionRef.current.style.transform = `translate(${
        left + 27.278566666666666
      }vw)`;
    }

    const updatedWilayas = [...wilayas];
    updatedWilayas.forEach((wilaya) => wilaya?.classList.add("lighten"));
    updatedWilayas[currentIndex]?.classList.remove("darken");
    updatedWilayas[currentIndex - 1]?.classList.add("darken");
    updatedWilayas[currentIndex - 1]?.classList.remove("lighten");
    setWilayas(() => updatedWilayas);

    setLeft(left + 27.278566666666666);
    if (currentIndex === 1) {
      setBack(false);
    } else {
      setForward(true);
    }
  };

  const goForward = () => {
    setCurrentIndex(currentIndex + 1);
    if (sectionRef.current) {
      sectionRef.current.style.transform = `translate(${
        left - 27.278566666666666
      }vw)`;
    }

    const updatedWilayas = [...wilayas];
    updatedWilayas.forEach((wilaya) => wilaya.classList.add("lighten"));
    updatedWilayas[currentIndex]?.classList.remove("darken");
    updatedWilayas[currentIndex + 1]?.classList.add("darken");
    updatedWilayas[currentIndex + 1]?.classList.remove("lighten");
    setWilayas(() => updatedWilayas);

    setLeft(left - 27.278566666666666);
    if (currentIndex === 8) {
      setForward(false);
    } else {
      setBack(true);
    }
  };

  const goToExactRegion = (index: number) => {
    setCurrentIndex(index);
    const updatedWilayas = [...wilayas];
    console.log(render.current);

    updatedWilayas.forEach((wilaya) => wilaya.classList.add("lighten"));
    updatedWilayas[currentIndex]?.classList.remove("darken");
    updatedWilayas[index]?.classList.add("darken");
    updatedWilayas[index]?.classList.remove("lighten");

    if (index < currentIndex) {
      sectionRef.current!.style.transform = `translate(${
        left + (currentIndex - index) * 27.278566666666666
      }vw)`;
      if (index === 0) {
        setBack(false);
      }
      setForward(true);
      setLeft(left + (currentIndex - index) * 27.278566666666666);
    } else if (index > currentIndex) {
      sectionRef.current!.style.transform = `translate(${
        left - (index - currentIndex) * 27.278566666666666
      }vw)`;
      if (index === 9) {
        setForward(false);
      }
      setBack(true);
      setLeft(left - (index - currentIndex) * 27.278566666666666);
    }

    setWilayas(() => updatedWilayas);
    render.current++;
  };

  const handleSwitch = (index: number) => {
    goToExactRegion(index);
  };

  useEffect(() => {
    if (document.getElementById("region") !== null) {
      const fetching = async () => {
        const response = await fetch(
          `https://ik.imagekit.io/vaqzdpz5y/assets/images/${region.id}/0.svg`
        );
        const svgContent = await response.text();
        document.getElementById("region")!.innerHTML = svgContent;
        document.getElementById("svg2")!.style.width = "100%";
        const wilayat = [];
        for (let i = 1; i < 11; i++) {
          const wilaya = document.getElementById(`${i}`);
          if (wilaya) wilayat.push(wilaya);
        }
        setWilayas(wilayat);
      };
      fetching();
    }
  }, []);

  useEffect(() => {
    const wilayat: HTMLElement[] = [];
    for (let i = 1; i < 11; i++) {
      const wilaya = document.getElementById(`${i}`);
      if (wilaya) {
        wilaya.addEventListener("click", () => {
          goToExactRegion(i - 1);
        });
        wilayat.push(wilaya);
      }
    }

    return () => {
      wilayat.forEach((wilaya, i) => {
        wilaya.removeEventListener("click", () => {
          goToExactRegion(i - 1);
        });
      });
    };
  }, [goToExactRegion]);

  return (
    <div className="row ml-[9.049479166666668vw] mt-[5vw] items-center gap-[6.8359375vw]">
      <div className="col gap-[1.8229166666666667vw]">
        <h3 className="text-[2.864583333333333vw] font-extrabold leading-[3.1901041666666665vw] text-newBlack">
          {region.name}
        </h3>
        <div className="relative">
          <div className="block w-[26.041666666666668vw] overflow-hidden">
            <ul
              className="row w-full gap-[1.2369vw] duration-500 ease-in-out"
              ref={sectionRef}
            >
              {region.wilayas.map((wilaya: any, i: number) => {
                return (
                  <li
                    className="box-content w-full flex-none overflow-hidden rounded-t-[0.78125vw] "
                    key={i}
                  >
                    <div>
                      <Link href="/destinations">
                        <div
                          style={{
                            backgroundImage: `url('https://ik.imagekit.io/vaqzdpz5y/assets/images/${region.id}/${wilaya.id}/0.png')`,
                          }}
                          className="relative h-[21.158854166666664vw] w-full bg-cover bg-center pt-[15.7vw]"
                        >
                          <h3 className="text-center text-[2.604166666666667vw] font-extrabold text-white ">
                            {wilaya.name}
                          </h3>
                        </div>
                      </Link>
                      <div className="col gap-[0.8vw] rounded-b-[0.78125vw] border-2 border-black px-[1.0416666666666665vw] py-[1.5625vw]">
                        <p className="text-[1.0416666666666665vw] font-medium leading-[1.26953125vw] text-newGrey">
                          {wilaya.about}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
          <button
            id="back"
            className=" absolute -left-[2.083333333333333vw] top-[13.346354166666666vw] hover:drop-shadow-md disabled:drop-shadow-none "
            onClick={goBack}
            disabled={!back}
          >
            <svg
              className="w-[4.166666666666666vw]"
              viewBox="0 0 45 45"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                width="44"
                height="44"
                rx="5.11364"
                transform="matrix(-1 0 0 1 44.5 0.00195312)"
                fill="#F1F5F6"
              />
              <g filter="url(#filter0_d_1247_230)">
                <path
                  className="hover:stroke-[1.4px]"
                  d="M28.5 33.1445L17.0714 21.716L28.5 10.2874"
                  stroke="#484848"
                  strokeWidth="1.02273"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_1247_230"
                  x="12.4696"
                  y="9.77588"
                  width="20.633"
                  height="32.0617"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4.09091" />
                  <feGaussianBlur stdDeviation="2.04545" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_1247_230"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1247_230"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </button>
          <button
            id="forward"
            className="absolute left-[23.958333333333336vw] top-[13.346354166666666vw] hover:drop-shadow-md disabled:drop-shadow-none "
            onClick={goForward}
            disabled={!forward}
          >
            <svg
              className="w-[4.166666666666666vw]"
              viewBox="0 0 45 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0.5" width="44" height="44" rx="5" fill="#F1F5F6" />
              <g filter="url(#filter0_d_1247_227)">
                <path
                  d="M16.5 33.1431L27.9286 21.7145L16.5 10.2859"
                  stroke="#484848"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
              <defs>
                <filter
                  id="filter0_d_1247_227"
                  x="12"
                  y="9.78613"
                  width="20.4287"
                  height="31.8569"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset dy="4" />
                  <feGaussianBlur stdDeviation="2" />
                  <feComposite in2="hardAlpha" operator="out" />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_1247_227"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1247_227"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </button>
        </div>
      </div>
      <div id="region" className="w-[51.5625vw]"></div>
    </div>
  );
};

const WilayaCard = ({
  regionId,
  wilaya,
  svgMap,
}: {
  regionId: number;
  wilaya: any;
  svgMap: string;
}) => {
  const wilayaRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      node.innerHTML = svgMap;
      if (node.childNodes[0]?.firstChild?.childNodes !== undefined) {
        const children = node.childNodes[0]?.firstChild
          ?.childNodes as unknown as HTMLElement[];
        children!.forEach((child) => {
          if (child.id === `${wilaya.id}`) {
            child.classList.add("redZone");
          }
        });
      }
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url('https://ik.imagekit.io/vaqzdpz5y/assets/images/${regionId}/${wilaya.id}/0.png')`,
      }}
      className="aspect-[0.99644] w-[20.833333333333336vw] rounded-xl border-[2px] border-newBlack bg-cover bg-center duration-700 ease-in-out "
    >
      <div
        className="mx-auto mt-[5.924479166666666vw] w-[15.104166666666666vw]"
        id={`${wilaya.name}`}
        ref={wilayaRef}
      ></div>
      <h2 className="mt-2 w-full text-center text-[1.8229166666666667vw] font-extrabold text-white">
        {wilaya.name}
      </h2>
    </div>
  );
};

const Description = ({ region }: { region: any }) => {
  const [description, setDescription] = useState<any[]>([]);

  const breakLine = (text: string) => {
    const words = text.split("\\r\\n");
    return words.map((word, index) => {
      return (
        <span key={index}>
          {word}
          <br />
        </span>
      );
    });
  };

  const fetchDestination = async (name: string) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${name}.json?country=dz&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );
    return response.json();
  };

  const distance = async ({
    origin,
    arrival,
  }: {
    origin: string;
    arrival: string;
  }) => {
    const originResponse = await fetchDestination(origin);
    const arrivalResponse = await fetchDestination(arrival);

    const originCoordinates = originResponse.features[0].center;
    const arrivalCoordinates = arrivalResponse.features[0].center;

    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoordinates[0]}%2C${originCoordinates[1]}%3B${arrivalCoordinates[0]}%2C${arrivalCoordinates[1]}?alternatives=false&geometries=geojson&overview=full&steps=false&access_token=${process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}`
    );
    return response.json();
  };

  const getDistances = async () => {
    const capital = region!.wilayas[Math.round(region!.wilayas.length / 2)];
    switch (region!.id) {
      case 1: {
        const algiersResponse = await distance({
          origin: capital.name,
          arrival: "Algiers",
        });

        const timimounResponse = await distance({
          origin: capital.name,
          arrival: "Timimoun",
        });

        const tamanrassetResponse = await distance({
          origin: capital.name,
          arrival: "Tamanrasset",
        });

        return [
          {
            distance: algiersResponse.routes[0].distance / 1000,
            from: "Algiers",
          },
          {
            distance: timimounResponse.routes[0].distance / 1000,
            from: "Saoura",
          },
          {
            distance: tamanrassetResponse.routes[0].distance / 1000,
            from: "Oasis",
          },
        ];
      }
      case 2: {
        const oranResponse = await distance({
          origin: capital.name,
          arrival: "Oran",
        });
        const timimounResponse = await distance({
          origin: capital.name,
          arrival: "Timimoun",
        });
        const tamanrassetResponse = await distance({
          origin: capital.name,
          arrival: "Tamanrasset",
        });

        return [
          { distance: oranResponse.routes[0].distance / 1000, from: "Oran" },
          {
            distance: timimounResponse.routes[0].distance / 1000,
            from: "Saoura",
          },
          {
            distance: tamanrassetResponse.routes[0].distance / 1000,
            from: "Oasis",
          },
        ];
      }
      case 10: {
        const oranResponse = await distance({
          origin: capital.name,
          arrival: "Oran",
        });
        const algiersResponse = await distance({
          origin: capital.name,
          arrival: "Algiers",
        });
        const tamanrassetResponse = await distance({
          origin: capital.name,
          arrival: "Tamanrasset",
        });
        return [
          { distance: oranResponse.routes[0].distance / 1000, from: "Oran" },
          {
            distance: algiersResponse.routes[0].distance / 1000,
            from: "Algiers",
          },
          {
            distance: tamanrassetResponse.routes[0].distance / 1000,
            from: "Oasis",
          },
        ];
      }
      default: {
        const oranResponse = await distance({
          origin: capital.name,
          arrival: "Oran",
        });
        const algiersResponse = await distance({
          origin: capital.name,
          arrival: "Algiers",
        });
        const timimounResponse = await distance({
          origin: capital.name,
          arrival: "Timimoun",
        });
        return [
          { distance: oranResponse.routes[0].distance / 1000, from: "Oran" },
          {
            distance: algiersResponse.routes[0].distance / 1000,
            from: "Algiers",
          },
          {
            distance: timimounResponse.routes[0].distance / 1000,
            from: "Saoura",
          },
        ];
      }
    }
  };

  const calculateZoneCenterX = (zonePath: SVGPathElement) => {
    const bbox = zonePath.getBBox();
    return bbox.x + bbox.width / 2;
  };

  const calculateZoneCenterY = (zonePath: SVGPathElement) => {
    const bbox = zonePath.getBBox();
    return bbox.y + bbox.height / 2;
  };

  const findCircles = (
    from: [number, number],
    to: [number, number],
    n: number
  ) => {
    let i = from[0];
    let a = from[1];
    let u = to[0];
    let l = to[1];
    let c = u - i;
    let f = l - a;
    let d = Math.sqrt(c * c + f * f);
    let p = (i + u) / 2;
    let h = (a + l) / 2;
    let v = Math.sqrt(n * n - (d / 2) * (d / 2));
    return [
      {
        x: p - (v * f) / d,
        y: h + (v * c) / d,
      },
      {
        x: p + (v * f) / d,
        y: h - (v * c) / d,
      },
    ];
  };

  const polarToCartesian = (e: number, t: number, n: number, r: number) => {
    let o = ((r - 90) * Math.PI) / 180;
    return {
      x: e + n * Math.cos(o),
      y: t + n * Math.sin(o),
    };
  };

  const angle = (e: number, t: number, n: number, r: number) => {
    return n >= e && r <= t
      ? (180 * Math.atan(Math.abs(e - n) / Math.abs(t - r))) / Math.PI
      : n >= e
      ? 180 - (180 * Math.atan(Math.abs(e - n) / Math.abs(t - r))) / Math.PI
      : r >= t
      ? 180 + (180 * Math.atan(Math.abs(e - n) / Math.abs(t - r))) / Math.PI
      : 360 - (180 * Math.atan(Math.abs(e - n) / Math.abs(t - r))) / Math.PI;
  };

  const arc = (e: number, t: number, n: number, r: number, o: number) => {
    let i = polarToCartesian(e, t, n, o);
    let a = polarToCartesian(e, t, n, r);
    let s = o - r <= 180 ? "0" : "1";
    return ["M", i.x, i.y, "A", n, n, 0, s, 0, a.x, a.y].join(" ");
  };

  const regionRef = useCallback((node: SVGSVGElement) => {
    if (node !== null) {
      const regionPath = document.getElementById(
        `${region.name}#${region.id}`
      ) as unknown as SVGPathElement;
      regionPath!.classList.add("redZone");

      let centerX1;
      let centerY1;

      let centerX2;
      let centerY2;

      let centerX3;
      let centerY3;

      switch (region!.id) {
        case 1: {
          const algeroisPath = document.getElementById(
            `${region.name}#${2}`
          ) as unknown as SVGPathElement;

          centerX1 = calculateZoneCenterX(algeroisPath);
          centerY1 = calculateZoneCenterY(algeroisPath);

          const saouraPath = document.getElementById(
            `${region.name}#${10}`
          ) as unknown as SVGPathElement;

          centerX2 = calculateZoneCenterX(saouraPath);
          centerY2 = calculateZoneCenterY(saouraPath);

          const oasisPath = document.getElementById(
            `${region.name}#${11}`
          ) as unknown as SVGPathElement;

          centerX3 = calculateZoneCenterX(oasisPath);
          centerY3 = calculateZoneCenterY(oasisPath);

          break;
        }
        case 2: {
          const oraniePath = document.getElementById(
            `${region.name}#${1}`
          ) as unknown as SVGPathElement;

          centerX1 = calculateZoneCenterX(oraniePath);
          centerY1 = calculateZoneCenterY(oraniePath);

          const saouraPath = document.getElementById(
            `${region.name}#${10}`
          ) as unknown as SVGPathElement;

          centerX2 = calculateZoneCenterX(saouraPath);
          centerY2 = calculateZoneCenterY(saouraPath);

          const oasisPath = document.getElementById(
            `${region.name}#${10}`
          ) as unknown as SVGPathElement;

          centerX3 = calculateZoneCenterX(oasisPath);
          centerY3 = calculateZoneCenterY(oasisPath);

          break;
        }
        case 10: {
          const oraniePath = document.getElementById(
            `${region.name}#${1}`
          ) as unknown as SVGPathElement;

          centerX1 = calculateZoneCenterX(oraniePath);
          centerY1 = calculateZoneCenterY(oraniePath);

          const algeroisPath = document.getElementById(
            `${region.name}#${2}`
          ) as unknown as SVGPathElement;

          centerX2 = calculateZoneCenterX(algeroisPath);
          centerY2 = calculateZoneCenterY(algeroisPath);

          const oasisPath = document.getElementById(
            `${region.name}#${11}`
          ) as unknown as SVGPathElement;

          centerX3 = calculateZoneCenterX(oasisPath);
          centerY3 = calculateZoneCenterY(oasisPath);

          break;
        }
        default: {
          const oraniePath = document.getElementById(
            `${region.name}#${1}`
          ) as unknown as SVGPathElement;

          centerX1 = calculateZoneCenterX(oraniePath);
          centerY1 = calculateZoneCenterY(oraniePath);

          const algeroisPath = document.getElementById(
            `${region.name}#${2}`
          ) as unknown as SVGPathElement;

          centerX2 = calculateZoneCenterX(algeroisPath);
          centerY2 = calculateZoneCenterY(algeroisPath);

          const oasisPath = document.getElementById(
            `${region.name}#${11}`
          ) as unknown as SVGPathElement;

          centerX3 = calculateZoneCenterX(oasisPath);
          centerY3 = calculateZoneCenterY(oasisPath);
        }
      }

      const regionX = calculateZoneCenterX(regionPath);
      const regionY = calculateZoneCenterY(regionPath);

      const svg = d3.select("#Algeria");

      svg
        .append("circle")
        .attr("cx", regionX)
        .attr("cy", regionY)
        .attr("r", 20)
        .attr("id", "circle0")
        .classed("center", true)
        .raise();

      const destinationGroup1 = svg
        .append("g")
        .attr("id", "group1")
        .attr("class", "mapDestination")
        .raise();

      destinationGroup1
        .append("circle")
        .attr("cx", centerX1)
        .attr("cy", centerY1)
        .attr("r", 15)
        .attr("id", "circle1")
        .classed("blackDot", true)
        .raise();

      let u = Math.abs(centerX1 - regionX);
      let l = Math.abs(centerY1 - regionY);
      let c = Math.sqrt(u * u + l * l) / 1.75;
      let f = findCircles([centerX1, centerY1], [regionX, regionY], c)[0];
      let p = angle(f!.x, f!.y, centerX1, centerY1);
      let h = angle(f!.x, f!.y, regionX, regionY);
      let v = (h - p + 360) % 360;
      let m = v < 180 ? p : h;
      let g = v < 180 ? h : p;
      let d = arc(f!.x, f!.y, c, m, g);

      destinationGroup1.append("path").attr("d", d).classed("line", true);

      const destinationGroup2 = svg
        .append("g")
        .attr("id", "group2")
        .attr("class", "mapDestination")
        .raise();

      destinationGroup2
        .append("circle")
        .attr("cx", centerX2)
        .attr("cy", centerY2)
        .attr("r", 15)
        .attr("id", "circle2")
        .classed("blackDot", true)
        .raise();

      u = Math.abs(centerX2 - regionX);
      l = Math.abs(centerY2 - regionY);
      c = Math.sqrt(u * u + l * l);
      f = findCircles([centerX2, centerY2], [regionX, regionY], c)[0];
      p = angle(f!.x, f!.y, centerX2, centerY2);
      h = angle(f!.x, f!.y, regionX, regionY);
      v = (h - p + 360) % 360;
      m = v < 180 ? p : h;
      g = v < 180 ? h : p;
      d = arc(f!.x, f!.y, c, m, g);

      destinationGroup2.append("path").attr("d", d).classed("line", true);

      const destinationGroup3 = svg
        .append("g")
        .attr("id", "group3")
        .attr("class", "mapDestination")
        .raise();

      destinationGroup3
        .append("circle")
        .attr("cx", centerX3)
        .attr("cy", centerY3)
        .attr("r", 15)
        .attr("id", "circle3")
        .classed("blackDot", true)
        .raise();

      u = Math.abs(centerX3 - regionX);
      l = Math.abs(centerY3 - regionY);
      c = Math.sqrt(u * u + l * l);
      f = findCircles([centerX3, centerY3], [regionX, regionY], c)[0];
      p = angle(f!.x, f!.y, centerX3, centerY3);
      h = angle(f!.x, f!.y, regionX, regionY);
      v = (h - p + 360) % 360;
      m = v < 180 ? p : h;
      g = v < 180 ? h : p;
      d = arc(f!.x, f!.y, c, m, g);

      destinationGroup3.append("path").attr("d", d).classed("line", true);

      document.querySelectorAll(".mapDestination").forEach((el) => {
        el.addEventListener("mouseenter", function () {
          el.classList.add("lineAnimation");
          document.querySelectorAll(".mapDestination").forEach((path) => {
            if (path !== el) {
              path.classList.add("lineInactive");
            }
          });
        });
        el.addEventListener("mouseout", function () {
          el.classList.remove("lineAnimation");
          document.querySelectorAll(".mapDestination").forEach((path) => {
            if (path !== el) {
              path.classList.remove("lineInactive");
            }
          });
        });
      });
    }
  }, []);

  useEffect(() => {
    const fetchDescription = async () => {
      const distances = await getDistances();
      setDescription(distances);
    };
    fetchDescription();
  }, []);

  if (description.length === 0) return <div></div>;

  return (
    <section id="region-description" className="row justify-between">
      <div className="description w-[64.12760416666666vw]">
        <h2 className="semi-title">Description</h2>
        <p className="paragraph">{breakLine(region!.description)}</p>
      </div>
      <div className="col h-[30.46875vw] w-[20.377604166666664vw] gap-[0.8463541666666666vw] rounded-[0.78125vw] border-2 bg-[rgba(210,212,212,0.15)]">
        <svg
          ref={regionRef}
          className="relative mx-auto mt-[5.338541666666666vw] w-[14.057942708333334vw]"
          viewBox="0 0 772.57226 753.59863"
          fill="none"
          version="1.1"
          id="Algeria"
          width="772.57227"
          height="753.59863"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="oranie">
            <path
              d="m 358.79,48.6045 -2.805,0.0944 -14.807,8.695 -2.975,3.1307 -3.768,7.5286 -4.776,2.9796 h -10e-4 l -5.53,-1.4906 -1.026,-1.1821 0.452,-1.2293 -1.444,-1.3631 -1.582,0.0409 -1.087,1.0813 -2.418,0.1763 -0.532,3.5479 -4.018,3.0898 -2.138,0.0173 -0.653,-1.2246 -4.11,-1.1899 -1.21,2.1595 -1.373,0.4093 -1.28,-0.9507 -4.205,3.6485 -3.32,2.6145 -1.442,-0.0567 -3.263,9.0381 -3.414,2.0022 -2.622,-0.2267 -4.302,2.8458 -6.444,4.719 -1.083,-0.573 -3.502,1.8826 -5.556,0.3998 -2.963,-1.36 -1.881,0.6674 -0.167,1.5317 4.195,3.946 1.702,1.292 2.236,-0.352 0.044,2.402 2.607,1.547 0.143,1.423 5.042,2.767 -4.031,5.172 1.239,0.505 2.208,3.838 2.071,0.938 -3.415,4.137 2.55,3.473 -0.343,2.914 1.931,6.054 5.819,-4.223 8.046,0.036 1.977,-2.27 2.465,-0.779 -0.006,0.006 1.741,2.63 3.437,-2.526 0.948,1.64 0.551,-0.672 4.782,1.442 6.534,-4.045 2.97,1.678 5.049,15.745 0.507,-1.82 1.376,0.066 3.37,-4.65 2.632,-1.145 2.214,0.319 2.421,-4.942 1.517,-1.115 -1.984,-8.879 -2.418,-2.414 10e-4,-0.002 2.418,2.415 3.757,1.229 3.377,3.428 3.503,0.408 4.672,-3.238 2.792,3.701 7.387,-5.052 4.598,1.184 v 0.002 l 6.403,1.333 -1.084,7.869 8.931,-0.476 0.349,2.97 1.802,2.542 3.539,-2.353 -1.302,-2.169 6.084,-3.59 0.44,1.835 2.65,-1.574 0.588,-3.93 2.964,-3.365 7.861,-2.826 3.784,-4.133 3.187,-1.429 0.702,-1.683 4.858,-0.601 -0.271,-3.912 2.369,-0.74 2.332,-7.512 5.203,-2.055 -2.305,-2.058 1.807,-3.6285 1.093,-0.4171 0.012,-2.4523 -2.817,-0.6737 -0.528,-1.8133 -1.695,-1.2828 -4.33,3.7053 -1.692,-2.9624 -10.924,-6.6203 -0.356,-2.2493 2.135,-0.4203 v 0.0016 l 5.964,-0.5099 1.144,-3.1717 -4.53,-1.19 -0.559,-2.191 0.812,-0.9995 3.589,0.3683 1.453,-6.2977 -2.517,-0.2109 -1.353,-1.7865 -1.981,-0.0897 -0.708,-1.5095 -4.332,1.1427 0.01,-1.6181 -4.245,4.7189 -1.249,0.03 -0.643,-1.8511 -3.438,-0.4045 -3.079,-1.8857 -1.67,-3.0237 -1.964,1.8762 -0.058,1.393 -3.647,0.9995 0.62,0.562 -0.836,0.5367 -0.093,2.2619 -3.497,-5.2919 -4.575,1.3096 -2.518,-1.5882 -0.872,-1.8998 -0.957,-0.0661 0.56,-0.3935 -2.861,1.0687 -0.836,-3.2189 -0.82,0.2535 1.332,-2.7184 -0.866,-0.0346 -0.753,-3.0521 -3.502,1.2907 -3.312,-0.5178 z"
              fill="#d1d5db"
              id={`${region.name}#1`}
            />
          </g>
          <g id="saoura">
            <path
              d="m 292.119,209.918 -2.465,0.434 -1.854,3.112 0.129,5.028 -2.031,1.66 3.044,-0.371 1.968,1.967 -3.047,2.048 -11.862,-0.921 -15.152,-4.141 -5.545,1.466 -3.69,-1.192 -6.527,0.145 -4.853,1.772 -11.089,-0.659 -0.982,3.609 3.433,9.719 -29.578,5.61 0.196,9.896 -2.757,2.015 -0.917,-0.806 -1.403,2.74 0.883,1.256 -1.174,1.066 1.015,2.369 -0.708,3.224 0.581,-0.984 1.031,0.387 -0.066,-1.193 0.985,0.419 0.192,-1.596 1.03,1.064 -0.386,2.642 1.243,0.259 -0.774,-0.386 1.061,-0.338 0.019,-0.485 0.755,-0.306 0.726,2.563 0.631,0.661 0.806,-0.839 0.321,1.064 -0.096,3.433 -2.836,3.562 -0.71,-0.434 -1.146,3.11 1.627,2.758 -0.935,1.24 -3.431,1.289 -3.949,1.467 -10.848,1.256 -6.32,2.015 -10.716,9.623 -12.059,5.223 -13.053,9.284 -1.628,2.417 -0.05,2.209 -6.784,8.687 -2.564,3.401 -4.269,-2.852 -2.225,0.74 1.095,-2.723 -2.676,-1.338 -9.575,1.547 -3.626,-1.047 -8.157,0.806 -2.0302,-0.758 -2.9812,1.627 -6.0096,-0.178 -3.1103,1.984 -13.2029,-3.449 -9.09,5.238 -7.9945,-0.226 -1.6118,2.838 -4.996,1.386 -6.8344,4.836 -8.0747,3.883 -10.9143,8.139 -7.7977,2.772 -5.144,57.978 106.3146,81.106 27.273,21.226 0.063,0.049 h 0.017 l 33.672,26.191 147.349,108.928 0.63,3.19 44.711,29.979 0.92,4.773 -1.323,9.282 0.74,1.903 5.028,-0.435 2.546,3.255 10.238,3.611 1.448,6.978 5.158,4.708 2.855,-0.065 1.595,2.467 1.645,-0.904 1.999,0.757 1.289,-0.628 2.06,1.854 3.03,-3.16 2.516,0.581 3.964,3.706 2.725,4.965 3.611,-1.176 -0.79,-4.657 -5.047,-12.009 -3.626,-5.255 0.05,-9.881 -2.707,-9.428 -4.014,-8.155 -9.831,-9.978 -2.257,-10.783 -0.196,-0.902 -7.12,-0.757 -6.709,1.078 1.017,-91.034 v -0.548 l -0.178,-26.514 -0.241,-35.362 -13.812,-19.551 -4.369,-9.737 12.055,-12.378 1.919,-3.948 4.239,-1.306 1.434,1.306 2.805,-0.323 0.228,1.321 3.785,-2.707 0.759,-14.313 4.126,-10.381 -2.982,-4.479 -0.082,-10.01 2.997,-5.126 1.308,-16.247 5.11,-8.108 0.757,-2.449 0.066,-0.194 0.947,-3.014 1.26,-17.069 1.805,-7.881 -6.883,-38.265 4.256,-21.405 1.094,-46.128 -33.975,21.241 -25.5,18.021 -22.612,-19.197 1.322,-4.802 -4.709,-3.789 -1.37,-2.934 -0.047,-3.014 1.628,-1.933 -2.015,-3.239 1.999,-1.952 -1.53,-1.9 0.965,-1.371 -0.29,-1.547 v -0.017 l 1.111,-0.096 -1.093,-3.674 0.226,-6.738 1.691,-3.578 1.772,-1.322 3.353,0.772 1.533,-7.075 -2.629,3.869 -3.884,-0.837 -2.919,2.144 -10.944,-3.065 -9.395,4.998 -0.485,-2.514 -2.224,-0.066 0.872,-4.625 -2.308,-0.193 z"
              fill="#d1d5db"
              stroke="#ffffff"
              strokeWidth="0.805901"
              id={`${region.name}#10`}
            />
          </g>
          <g id="oasis">
            <path
              d="m 507.502,164.64 -3.9,8.268 3.562,18.44 -8.124,15.005 -10.895,11.783 -0.726,15.94 -0.515,11.476 -5.109,13.137 -16.908,59.169 -2.547,1.757 -10.895,22.71 -13.266,5.851 v 0.001 l -17.957,1.563 -16.552,6.141 -1.258,17.068 -0.95,3.015 -0.065,0.193 -0.757,2.451 -5.109,8.106 -1.307,16.247 -2.997,5.127 0.081,10.009 2.981,4.48 -4.126,10.381 -0.758,14.312 -3.787,2.708 -0.226,-1.321 -2.804,0.323 -1.434,-1.307 -4.241,1.307 -1.917,3.947 -12.057,12.38 4.368,9.735 13.814,19.551 0.242,35.362 0.178,26.515 v 0.548 l -1.015,91.035 6.705,-1.08 7.124,0.757 0.194,0.902 2.255,10.784 9.833,9.978 4.012,8.155 2.709,9.428 -0.049,9.882 3.627,5.254 5.045,12.008 0.79,4.658 -3.611,1.175 2.386,0.098 4.351,2.304 4.964,-0.031 10.172,2.144 10.541,5.092 -0.661,5.981 0.87,1.465 -0.87,2.805 1.563,2.516 -0.581,1.578 1.484,3.466 -2.37,2.514 -0.597,2.756 -3.368,4.611 0.821,1.869 8.237,6.301 97.53,-22.193 61.346,-60.815 10.911,-7.945 92.777,-67.551 63.31,-46.92 -17.004,-28.803 -6.624,3.192 -11.411,-7.044 -3.241,-1.062 -4.094,-4.079 -2.078,-0.839 -2.758,-0.385 -2.077,2.609 -2.467,-2.4 -3.433,0.225 -2.482,1.821 -7.108,0.387 -5.593,-4.303 -7.673,-12.411 -0.613,-7.995 -0.645,-8.221 -25.805,-32.766 1.968,-2.498 1.741,-5.546 12.587,-6.384 1.499,-5.334 -0.161,-8.865 -2.724,-3.594 -3.611,-12.233 -0.208,-3.998 0.773,-4.544 1.692,-1.839 0.387,-2.4 -2.241,-0.373 1.742,-0.595 1.869,-3.965 0.87,-7.769 -5.882,-16.876 1.209,-19.599 -1.854,-10.944 -4.401,-16.07 -9.928,-19.003 -4.804,-5.529 -1.111,-4.206 0.741,-1.741 4.996,-2.079 -3.884,-13.315 -18.358,-61.973 -64.038,6.866 -5.463,-0.645 -2.66,-1.305 -4.077,-1.821 -4.448,-1.79 -11.686,-4.174 -3.288,-0.339 -10.349,-13.764 -0.321,-9.526 -4.433,-1.419 -1.273,-1.402 -1.548,-3.288 c 0,0 -4.093,-3.498 -4.577,-3.369 -0.467,0.145 0,-8.929 0,-8.929 l -2.144,-2.917 v -1.805 l -14.185,0.258 -1.465,2.997 z"
              fill="#d1d5db"
              stroke="#ffffff"
              strokeWidth="0.805901"
              id={`${region.name}#11`}
            />
          </g>
          <g id="mzab">
            <path
              d="m 459.328,183.403 -0.676,1.209 -0.709,-0.516 -1.516,1.193 -12.652,0.579 5.898,3.595 0.532,4.674 -13.781,-3.289 -8.657,2.596 -17.454,1.532 0.919,9.962 1.256,5.06 0.017,0.016 1.821,7.302 -4.16,2.707 1.163,13.877 -7.497,8.303 -1.094,46.128 -4.256,21.405 6.883,38.265 -1.805,7.881 16.551,-6.14 17.956,-1.563 13.266,-5.853 10.894,-22.71 2.547,-1.756 16.91,-59.169 5.109,-13.136 0.515,-11.477 0.725,-15.941 10.896,-11.783 8.123,-15.005 -19.131,-5.19 -21.082,-1.451 -1.24,0.677 -4.32,-1.79 -1.47,0.63 z"
              fill="#d1d5db"
              stroke="#ffffff"
              strokeWidth="0.805901"
              id={`${region.name}#9`}
            />
          </g>
          <g id="aures">
            <path
              d="m 561.708,50.7441 -0.423,2.328 -3.616,0.2566 -0.604,1.722 -1.809,-0.9712 0.748,1.2954 -1.627,-0.595 -0.957,-1.8683 0.613,-0.7052 -3.813,1.3914 -0.262,4.4986 -1.964,2.4712 -1.261,-0.1873 0.343,1.2419 -1.152,-0.8216 -2.658,0.3636 -1.294,3.4015 -5.774,-0.6737 -0.79,0.617 -1.555,0.9192 0.718,1.8747 -4.524,-3.8973 -1.957,0.51 -2.295,2.5137 0.196,1.2466 1.953,0.6501 -1.277,2.0982 -1.097,-0.3841 -0.809,0.872 -3.697,-1.5283 -0.39,1.1033 -1.283,-0.1259 -2.229,1.7614 0.378,1.6133 -1.258,2.8349 -1.816,-0.5368 -4.29,4.7756 -2.927,1.4607 -1.162,-1.722 -1.712,-0.0189 -1.335,1.4843 -0.12,-1.2686 -1.546,2.4271 -3.133,-2.7372 1.323,7.0941 -0.61,4.1035 -1.477,2.4933 -0.845,-0.2991 -1.913,1.8904 0.314,0.9759 4.72,0.0976 3.427,2.2508 0.005,-0.0016 0.708,5.6261 0.888,0.483 -0.871,0.113 -1.097,2.563 -1.676,0.5 c 2.885,0.145 6.013,0.257 6.013,0.257 l 1.209,3.176 1.514,1.305 0.242,1.676 2.015,1.499 1.418,1.564 v 2.418 l 0.935,2.402 3.546,2.353 19.117,2.031 0.112,0.015 8.559,-2.095 9.235,3.288 2.337,2.256 2.66,-0.935 v -0.016 l 2.788,-3.529 0.08,3.482 8.366,5.061 2.498,0.563 0.145,-7.382 7.124,-0.644 6.868,2.402 13.311,0.66 1.195,-6.833 8.621,-4.82 1.774,-2.691 1.774,-0.178 -0.372,-1.112 2.224,-2.208 -1.449,-1.273 2.627,-2.113 -1.419,-1.578 -1.5,-5.997 2.258,-1.305 1.064,-6.3342 3.787,-6.093 -2.465,-0.1134 -3.337,-2.6097 -0.114,-4.1916 2.242,-3.0788 -0.984,-1.563 -0.516,-6.1088 -3.159,-2.2399 0.049,-6.7053 -0.758,-0.6611 1.063,-2.0793 -3.498,-1.7409 -4.029,1.7897 -2.031,-0.2408 -3.385,3.7871 -2.61,0.0472 -3.032,-2.2556 -0.643,2.1911 0.006,0.0047 -1.319,0.787 0.57,2.4775 -4.538,0.3448 0.05,-2.3815 -4.308,-1.5158 -1.654,-2.1454 -1.047,-3.4172 -1.187,-0.0724 -0.681,-3.6471 -2.026,0.1228 -1.102,2.86 -4.487,2.2115 -1.609,-0.2676 0.315,-1.5425 -2.039,-0.8878 0.326,-2.0242 -5.836,-0.107 z"
              fill="#d1d5db"
              stroke="#ffffff"
              strokeWidth="0.805901"
              id={`${region.name}#7`}
            />
          </g>
          <g id="asahari">
            <path
              d="m 485.576,60.3906 -5.463,2.3532 -4.449,-1.5803 -3.562,1.2261 -0.919,-1.7739 -1.709,5.2557 0.725,2.2398 -4.094,-1.4339 -2.046,1.9502 -1.306,-0.0818 -0.564,-1.6118 -1.725,-0.3542 -1.047,-1.4985 -2.482,-0.2424 -0.855,1.3065 0.435,1.2734 -1.837,1.1112 0.886,0.5966 -3.255,1.0955 1.385,2.0635 0.049,4.7867 -4.352,-6.7054 -1.45,0.2267 0.661,1.2403 -0.79,0.8059 0.392,1.5929 -0.047,-0.0472 -0.499,-2.0289 -1.759,0.0787 -1.385,-2.7719 -1.659,1.6449 0.178,1.9502 -1.228,2.2083 -4.478,1.1271 -0.307,-3.5448 -1.127,0.2251 -1.112,-3.7556 -4.176,1.1286 1.095,8.0747 -0.933,-0.4187 -2.95,2.1911 -2.578,4.1271 -2.098,1.0798 -4.335,-3.0788 -0.372,0.9035 -3.995,1.3048 -3.45,0.2739 -1.062,-3.8202 -5.964,0.5163 -2.128,0.4187 0.354,2.2572 10.928,6.6077 1.691,2.9655 4.32,-3.7068 1.693,1.2907 0.532,1.8038 2.82,0.6768 -0.015,2.4508 -1.096,0.4187 -1.807,3.6263 2.306,2.064 -5.19,2.062 -2.335,7.511 -2.373,0.726 0.276,3.916 -4.869,0.596 -0.691,1.692 -3.192,1.419 -3.788,4.142 -7.866,2.821 -2.964,3.369 -0.58,3.933 -2.643,1.563 -0.454,-1.821 -6.077,3.578 1.308,2.177 -3.546,2.353 -1.804,-2.547 -0.342,-2.966 -8.926,0.468 h -0.017 l 1.097,-7.867 -6.4,-1.336 -4.612,-1.178 -7.382,5.045 -2.788,-3.69 -4.673,3.238 -3.497,-0.417 -3.385,-3.419 -3.757,-1.24 1.982,8.881 -1.513,1.113 -2.417,4.947 -2.209,-0.321 -2.643,1.144 -3.37,4.657 -1.369,-0.064 -0.516,1.821 -5.043,-15.747 -2.969,-1.676 -6.543,4.045 -4.77,-1.451 -0.551,0.677 -0.949,-1.643 -3.431,2.531 -1.76,-2.629 -2.451,0.775 -1.981,2.272 -8.04,-0.048 -5.82,4.24 -1.918,9.186 0.887,4.061 -2.066,1.5 -0.337,1.434 2.901,0.822 1.901,3.256 0.161,3.095 -2.772,6.14 -0.305,4.143 3.126,5.512 3.547,3.369 -0.612,3.869 -2.032,0.676 5.401,9.155 3.834,1.903 9.301,7.495 -4.626,4.175 0.256,3.851 2.308,0.194 -0.872,4.624 2.224,0.067 0.485,2.513 9.395,-4.997 10.944,3.064 2.919,-2.143 3.884,0.837 2.629,-3.869 -1.533,7.075 -3.353,-0.773 -1.772,1.323 -1.691,3.577 -0.226,6.739 1.094,3.673 -1.112,0.097 v 0.017 l 0.29,1.547 -0.965,1.371 1.53,1.9 -1.999,1.952 2.015,3.239 -1.628,1.933 0.047,3.014 1.37,2.934 4.709,3.789 -1.322,4.802 22.613,19.197 25.499,-18.021 33.975,-21.241 7.497,-8.303 -1.163,-13.877 4.16,-2.707 -1.821,-7.302 -0.017,-0.016 -1.256,-5.06 -0.92,-9.962 17.455,-1.532 8.657,-2.596 13.78,3.289 -0.532,-4.674 -5.897,-3.595 12.652,-0.579 1.515,-1.193 0.71,0.516 0.675,-1.209 0.482,0.822 1.47,-0.63 4.319,1.79 1.241,-0.677 21.082,1.451 19.131,5.19 -3.561,-18.44 3.899,-8.268 -0.174,-3.062 0.835,-1.418 -6.445,-1.612 -1.178,-1.967 -3.159,0.516 -0.628,-1.531 -5.254,-1 -1.742,-2.385 -10.589,-4.561 -0.725,-1.113 0.643,-0.837 2.162,-0.21 2.208,-2.37 h 1.934 l -0.919,-1.176 -3.788,-0.63 -0.629,-2.4 -3.045,-0.436 -1.499,-1.837 0.559,-0.878 0.302,0.252 3.208,-0.839 1.258,-1.628 -2.934,-1.5 0.5,-1.16 -1.967,-2.046 -0.66,-4.98 -0.854,-0.485 3.529,-2.95 1.419,-2.948 7.752,-0.065 2.95,-1.838 1.064,0.71 1.643,-0.871 -2.095,-1.756 1.612,-0.274 1.516,-2.418 7.075,-2.128 h 0.016 l 1.676,-0.5 1.096,-2.563 0.87,-0.112 -0.886,-0.484 -0.708,-5.6244 -3.433,-2.2572 -4.724,-0.096 -0.305,-0.968 1.901,-1.9014 0.855,0.3053 1.483,-2.498 0.596,-4.094 -1.322,-7.091 3.143,2.7231 1.548,-2.4177 0.111,1.2576 1.338,-1.4827 1.71,0.0315 1.16,1.7094 2.934,-1.4513 4.287,-4.7866 -5.625,-0.7414 -0.886,-1.3064 0.676,-0.8705 -0.79,-0.8216 -1.789,0.3872 -2.369,-1.6921 0.274,-0.9995 -2.273,0.8217 -0.29,-1.966 -1.886,0.0803 -2.128,-2.6916 -4.383,0.8547 -3.353,2.5295 -1.064,-1.2404 0.63,-1.7566 -2.144,1.031 0.579,1.5961 -4.544,-0.4675 1.111,-3.3842 2.596,-0.9995 z"
              fill="#d1d5db"
              stroke="#ffffff"
              strokeWidth="0.805901"
              id={`${region.name}#6`}
            />
          </g>
          <g id="constantinois">
            <path
              d="m 623.336,16.6885 -7.176,2.3217 -2.303,-1.0546 -2.937,0.4391 -1.583,-1.3883 -7.631,4.3144 -5.835,0.7146 0.59,1.105 -1.837,0.0142 -0.048,2.1407 -1.515,-0.2314 -1.561,1.8384 0.688,1.2042 -0.923,2.3311 -1.405,2.1564 -4.373,-0.8106 -0.282,-1.914 -1.78,0.82 -0.321,1.1947 -0.705,-1.4119 -1.856,0.1968 -0.867,0.5651 -0.674,-0.7194 -0.886,1.6937 -5.777,2.0383 -1.053,1.4056 0.677,2.0038 -4.237,1.1254 -0.098,2.4854 -2.016,-0.2094 -0.644,-1.1285 -1.811,0.3352 0.333,-3.244 1.565,-1.6417 -2.903,0.5823 -3.664,-0.6831 -0.595,-2.1344 -1.722,2.2383 -3.526,-0.2377 -0.033,2.5767 -5.315,1.234 0.459,3.2567 -1.484,3.0269 2.126,-0.6517 1.815,1.4166 -0.426,2.3973 1.27,0.7996 1.642,-0.4754 1.509,1.2939 -0.173,2.1832 -0.615,0.7035 0.958,1.87 1.628,0.595 -0.748,-1.2955 1.809,0.9712 0.604,-1.722 3.614,-0.2565 0.425,-2.328 2.33,1.8794 5.831,0.1054 -0.325,2.0242 2.039,0.8878 -0.316,1.5425 1.609,0.2676 4.489,-2.2115 1.1,-2.86 2.026,-0.1228 c 0,0 0.496,2.6347 0.984,3.2945 l 1.186,0.0724 1.047,3.4172 1.654,2.1454 4.309,1.5158 -0.051,2.3815 4.538,-0.3448 -0.571,-2.4775 1.319,-0.7807 0.64,-2.1989 3.026,2.2571 2.614,-0.0488 3.387,-3.7918 2.023,0.2519 4.028,-1.7913 3.505,1.7425 -0.004,-3.5825 1.399,-2.4996 -1.343,-2.9434 1.399,-2.5342 -0.637,-1.3064 1.695,-1.7204 -0.614,-2.0179 0.957,-2.7672 -1.896,-1.0247 -1.201,0.8547 -5.15,-1.3631 -0.38,0.1716 -0.447,-1.031 0.756,-0.7728 3.749,-1.2829 3.721,-3.4345 1.475,-0.1904 1.122,-3.3055 -0.683,-1.8479 -1.391,-0.6501 4.788,-0.8578 3.193,-2.1312 0.289,-0.8406 -1.913,-0.543 z"
              fill="#d1d5db"
              stroke="#ffffff"
              strokeWidth="0.805901"
              id={`${region.name}#5`}
            />
          </g>
          <g id="pkabylie">
            <path
              d="m 581.096,12.9229 -3.34,0.5619 h -0.002 l -3.979,-0.096 2.961,2.0918 0.448,1.6843 -3.291,3.1087 -2.674,-0.0662 -4.252,1.763 -2.391,-0.3841 -1.254,-2.5767 -2.654,0.6328 -0.628,-0.7729 -1.034,0.8421 -4.65,-1.0735 -1.239,-3.2897 -2.608,-1.3347 -4.511,1.0357 -2.355,1.8762 -0.768,1.8259 0.762,1.637 -0.095,0.0519 -9.263,4.8055 -5.591,1.3694 -1.375,-0.9098 -2.69,0.5289 -3.82,2.3154 -1.66,3.2708 -2.97,1.5 0.002,0.052 -6.971,0.499 -4.652,-2.5169 0.715,-2.7656 -3.016,-0.5855 -3.285,-2.3201 -5.481,-1.7094 -5.82,0.6532 2.254,3.1465 0.111,2.1564 -1.081,1.0546 -1.136,-0.8689 -1.982,0.5808 -0.238,1.0405 2.867,1.5221 -2.031,2.5483 0.656,1.0656 -3.511,3.9367 -2.893,1.3395 1.092,2.1359 -0.242,2.1029 -1.195,0.787 1.209,1.5961 -0.359,0.968 -0.002,-0.0031 -1.262,1.4796 -2.193,-0.148 -1.281,2.0022 -2.753,1.3882 -0.299,3.8438 -2.366,1.8259 0.92,1.7802 3.563,-1.2387 4.44,1.5929 5.464,-2.3548 1.394,4.4703 -2.606,1.0073 -1.11,3.3779 4.548,0.4706 -0.581,-1.5976 2.142,-1.031 -0.623,1.7598 1.068,1.234 3.34,-2.5169 4.384,-0.8578 2.142,2.69 1.881,-0.0787 0.295,1.9612 2.258,-0.8185 -0.272,1.0106 2.374,1.6794 1.786,-0.3872 0.784,0.8343 -0.674,0.8641 0.883,1.3002 5.631,0.7539 1.816,0.5368 1.258,-2.8349 -0.378,-1.6133 2.229,-1.7614 1.283,0.1259 0.389,-1.1033 3.7,1.5283 0.809,-0.872 1.097,0.3841 1.277,-2.0982 -1.954,-0.6501 -0.195,-1.2466 2.295,-2.5137 1.957,-0.51 4.523,3.8973 -0.717,-1.8747 1.555,-0.9192 c 0,0 0.793,-0.617 0.003,0.0016 l 0.789,-0.617 5.775,0.6737 1.295,-3.4062 2.659,-0.3652 1.152,0.8232 -0.343,-1.2435 1.26,0.1874 1.965,-2.4713 0.261,-4.4985 3.814,-1.3915 0.175,-2.1816 -1.511,-1.2938 -1.64,0.4753 -1.271,-0.7996 0.425,-2.3988 -1.815,-1.4166 -2.126,0.6532 1.486,-3.0268 -0.46,-3.2583 5.316,-1.2324 0.031,-2.5783 -10e-4,-0.0031 3.525,0.2361 1.722,-2.2367 0.595,2.1344 3.665,0.6831 2.902,-0.5824 -1.564,1.6417 -0.334,3.2441 1.812,-0.3353 0.643,1.1286 2.021,0.2093 0.098,-2.4854 4.239,-1.1254 -0.679,-2.0053 1.053,-1.404 5.777,-2.0384 0.886,-1.6936 0.674,0.7193 0.864,-0.5619 1.856,-0.1968 0.705,1.4119 0.321,-1.1947 1.78,-0.82 0.282,1.914 4.373,0.8106 1.405,-2.158 0.923,-2.3327 -0.69,-1.2041 1.563,-1.8369 1.513,0.2298 0.05,-2.1407 1.836,-0.0142 -0.591,-1.1033 -1.92,-1.3994 0.86,-3.6375 -2.856,0.9774 -1.676,-1.1459 -1.151,0.8107 -3.803,-3.2 -3.453,0.3038 z"
              fill="#d1d5db"
              stroke="#ffffff"
              strokeWidth="0.805901"
              id={`${region.name}#4`}
            />
          </g>
          <g id="toggourt">
            <path
              d="m 501.121,108.325 -7.077,2.127 -1.514,2.417 -1.612,0.274 2.095,1.758 -1.644,0.871 -1.063,-0.71 -2.95,1.837 -7.753,0.064 -1.419,2.95 -3.528,2.95 0.853,0.483 0.661,4.98 1.966,2.048 -0.499,1.16 2.934,1.5 -1.258,1.628 -3.208,0.837 -0.708,1.113 1.498,1.837 3.046,0.436 0.63,2.4 3.787,0.63 0.919,1.176 h -1.934 l -2.209,2.37 -2.159,0.21 -0.646,0.837 0.726,1.113 10.59,4.561 1.741,2.385 5.254,0.999 0.628,1.532 3.159,-0.516 1.177,1.966 6.448,1.611 -0.839,1.42 0.178,3.062 6.318,5.641 1.467,-2.997 14.183,-0.258 v 1.805 l 2.144,2.917 c 0,0 -0.467,9.075 0,8.929 0.484,-0.128 4.577,3.369 4.577,3.369 l 1.548,3.288 1.273,1.402 4.432,1.419 0.323,9.526 10.348,13.765 3.288,0.338 11.685,4.174 4.449,1.79 4.078,1.821 2.66,1.305 5.463,0.645 64.038,-6.866 -25.789,-15.667 -1.918,-13.151 -7.672,-8.963 -0.081,-2.064 -7.528,-3.11 -2.563,-0.015 -3.206,-9.816 -5.755,-8.994 -0.434,-4.417 -2.273,-1.708 0.74,-1.611 -1.015,-2.886 0.92,-4.578 -1.177,-1.902 2.74,-1.934 1.45,-3.529 2.707,1.079 2.58,-2.03 -0.162,-1.226 -13.311,-0.66 -6.868,-2.402 -7.124,0.644 -0.145,7.382 -2.498,-0.563 -8.366,-5.061 -0.08,-3.481 -2.787,3.528 v 0.018 l -2.661,0.933 -2.337,-2.255 -9.236,-3.288 -8.558,2.095 -0.112,-0.016 -19.118,-2.031 -3.545,-2.353 -0.935,-2.402 v -2.418 l -1.418,-1.564 -2.015,-1.499 -0.242,-1.676 -1.516,-1.305 -1.209,-3.176 c 0,0 -3.126,-0.112 -6.011,-0.257 z"
              fill="#d1d5db"
              stroke="#ffffff"
              strokeWidth="0.805901"
              id={`${region.name}#8`}
            />
          </g>
          <g id="gkabylie">
            <path
              d="m 464.273,23.4805 -5.226,1.6684 -1.46,1.7393 -6.205,3.2016 -4.549,-0.4423 -0.436,0.9806 1.061,-0.3463 0.047,1.6449 -3.671,1.1994 -1.064,-0.7776 0.628,1.1318 -1.109,0.8798 1.218,2.1108 1.428,-0.5619 -0.865,0.7713 0.757,1.3819 -0.618,0.6674 0.941,0.4329 -0.398,2.0572 4.388,4.2389 2.514,-2.3862 2.189,1.1348 -0.706,1.105 1.605,2.243 -1.725,0.9633 -0.711,2.0415 1.723,1.5756 -0.291,1.3033 -2.298,0.6674 -0.368,1.3773 1.057,1.6795 -0.658,0.7807 -1.448,1.5079 -1.635,-0.0236 0.773,1.2576 4.494,0.7005 2.268,4.2687 0.856,-1.3017 2.478,0.2471 1.056,1.4891 1.728,0.3573 0.562,1.6196 1.294,0.0771 2.046,-1.9565 4.097,1.4355 -0.716,-2.2335 1.706,-5.2572 2.366,-1.8259 0.298,-3.8438 2.752,-1.3883 1.282,-2.0021 2.194,0.1479 1.262,-1.4796 0.358,-0.968 -1.209,-1.5961 1.196,-0.787 0.241,-2.1029 -1.093,-2.1359 h 0.004 l 2.893,-1.3395 3.511,-3.9366 -0.656,-1.0657 2.031,-2.5483 -2.867,-1.5221 0.238,-1.0404 1.982,-0.5808 1.136,0.8688 1.081,-1.0546 -0.111,-2.1564 -2.254,-3.1465 -5.113,-1.0199 -1.59,0.8814 -2.982,-0.6863 -8.768,0.5179 v 0.0031 z"
              fill="#d1d5db"
              stroke="#ffffff"
              strokeWidth="0.805901"
              id={`${region.name}#3`}
            />
          </g>
          <g id="algerois">
            <path
              d="m 442.324,28.2868 -0.254,2.0872 -3.415,1.0027 -1.873,-0.8469 -0.795,-1.9344 -2.953,-0.1433 -1.942,0.3794 -0.44,1.522 -1.451,0.2802 -0.982,2.6035 c 0,0 0,0 -0.002,0 l -8.363,4.5725 -4.394,-0.063 -0.776,-1.6511 -1.895,-0.4502 -10.864,3.274 -3.724,-0.4407 -7.249,1.0955 -6.982,1.053 -4.302,-1.1081 -2.562,1.936 -6.783,0.5069 -4.925,1.9045 -1.595,2.7184 -5.021,2.0116 -1.611,5.2919 3.311,0.5178 3.502,-1.2907 0.753,3.0521 0.866,0.0346 -1.334,2.7183 0.822,-0.2534 0.836,3.2189 2.861,-1.0688 -0.56,0.3935 0.957,0.0661 0.872,1.9015 2.518,1.5866 4.575,-1.3096 3.5,5.2982 0.098,-2.2792 0.834,-0.5368 -0.619,-0.5619 3.646,-0.9995 0.058,-1.393 1.965,-1.8762 1.67,3.0237 3.077,1.8904 3.438,0.4045 0.643,1.851 1.249,-0.0299 4.245,-4.7189 -0.01,1.6181 4.332,-1.1427 0.708,1.5095 1.98,0.0897 1.354,1.7865 2.517,0.2109 v 0.0032 l -1.453,6.2976 -3.589,-0.3683 -0.812,0.9995 0.559,2.1911 4.53,1.1899 -1.144,3.1717 1.062,3.8091 3.447,-0.2691 3.987,-1.3096 0.37,-0.9019 4.351,3.0772 2.084,-1.0672 2.584,-4.1334 2.95,-2.1926 0.933,0.4171 -1.089,-8.0669 4.167,-1.1396 1.117,3.7667 1.127,-0.233 0.299,3.5463 4.492,-1.1302 1.214,-2.2067 -0.168,-1.944 1.663,-1.6448 1.376,2.7655 1.758,-0.0787 0.789,-0.798 -0.653,-1.2419 1.44,-0.2267 4.366,6.6975 -0.058,-4.7803 -1.387,-2.0651 3.257,-1.1034 -0.886,-0.5918 1.84,-1.1066 -0.439,-1.2812 -2.265,-4.2688 -4.494,-0.7004 -0.773,-1.2577 1.635,0.0236 1.448,-1.5063 0.658,-0.7823 -1.057,-1.6795 0.368,-1.3773 2.298,-0.6674 0.291,-1.3032 -1.723,-1.5756 0.711,-2.0416 1.725,-0.9633 -1.605,-2.2429 0.706,-1.105 -2.189,-1.1349 -2.514,2.3862 -4.387,-4.2372 0.399,-2.0604 -0.943,-0.436 0.618,-0.6674 -0.757,-1.3805 0.864,-0.7728 -1.429,0.5635 -1.218,-2.1123 1.111,-0.8799 -0.629,-1.1317 1.064,0.7791 3.672,-1.201 -0.049,-1.6433 -1.061,0.3463 0.438,-0.9822 z"
              fill="#d1d5db"
              stroke="#ffffff"
              strokeWidth="0.805901"
              id={`${region.name}#2`}
            />
          </g>
        </svg>
        <p className=" mx-auto text-[1.2369791666666665vw] leading-[3.90625vw] text-newBlack ">
          <b>{Math.round(description[0].distance)} km</b> from{" "}
          {description[0].from}
          <br />
          <b>{Math.round(description[1].distance)} km</b> from{" "}
          {description[1].from}
          <br />
          <b>{Math.round(description[2].distance)} km</b> from{" "}
          {description[2].from}
        </p>
      </div>
    </section>
  );
};

const Wilayas = ({ region }: { region: any }) => {
  const [svgMap, setSvgMap] = useState<string>("");
  useEffect(() => {
    const fetching = async () => {
      const response = await fetch(
        `https://ik.imagekit.io/vaqzdpz5y/assets/images/${region!.id}/2.svg`
      );
      const svgContent = await response.text();
      setSvgMap(svgContent);
    };
    fetching();
  }, []);

  if (!svgMap) return null;

  return (
    <section id="explore wilayas" className="col items-start">
      <h2 className="semi-title">Explore {region.name} by Wilaya</h2>
      <div className=" mt-[2.864583333333333vw] flex flex-wrap justify-start gap-[1.171875vw]">
        {region?.wilayas.map((wilaya: any) => (
          <WilayaCard
            key={wilaya.id}
            regionId={region!.id}
            wilaya={wilaya}
            svgMap={svgMap}
          />
        ))}
      </div>
    </section>
  );
};

const Region = () => {
  const dispatch = useAppDispatch();
  const regions = useSelector(selectRegionsState);
  dispatch(getAllRegions());

  const router = useRouter();
  const regionQuery = router.query.slug;

  if (typeof regionQuery !== "string") {
    return null;
  }

  const words = regionQuery.split(" ");

  const regionCapital = words.map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });

  const regionCapitalString = regionCapital.join(" ");

  const region = regions.find((region) => {
    return region.name === regionCapitalString;
  });

  if (!region) {
    return null;
  }

  return (
    <main id="">
      <header
        style={{
          backgroundImage: `url('https://ik.imagekit.io/vaqzdpz5y/assets/images/${
            region!.id
          }/2.png')`,
        }}
        className="bg-image"
      >
        <div className="absolute left-[10.0911vw] top-[19.46614vw]">
          <h1 className="title text-white">{region!.name}</h1>
          <h2 className="bg-semi-title text-white">Destination</h2>
        </div>
      </header>
      <WilayasMap region={region} />
      <div className="new-page mx-auto mt-[9vw] w-[87.1vw]">
        <Description region={region} />
        <Wilayas region={region} />
      </div>
    </main>
  );
};

export default Region;

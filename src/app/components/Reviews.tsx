import { Star } from "lucide-react";
import Image from "next/image";

const reviews: {
  user: string;
  date: Date;
  location: string;
  rating: number;
  review: string;
}[] = [
  {
    user: "Yifei Chen",
    date: new Date("07/02/2019"),
    location: "Seoul, South Korea",
    rating: 5,
    review:
      "What a great experience using Tripma! I booked all of my flights for my gap year through Tripma and never had any issues. When I had to cancel a flight because of an emergency, Tripma support helped me read more",
  },
  {
    user: "Kaori Yamaguchi",
    date: new Date("03/03/2017"),
    location: "Honolulu, Hawaii",
    rating: 4,
    review:
      "When I was looking to book my flight to Berlin from LAX, Tripma had the best browsing experiece so I figured I’d give it a try. It was my first time using Tripma, but I’d definitely recommend it to a friend and use it for read more...",
  },
  {
    user: "Anthony Lewis",
    date: new Date("01/02/2019"),
    location: "Berlin, Germany",
    rating: 5,
    review:
      "My family and I visit Hawaii every year, and we usually book our flights using other services. Tripma was recommened to us by a long time friend, and I’m so glad we tried it out! The process was easy and read more...",
  },
];

const months: string[] = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function Reviews() {
  return (
    <section className="flex flex-col justify-start items-center gap-6 p-10 md:p-[64px]">
      <h1 className="w-fit font-bold text-2xl">
        What <span className="text-primary">Tripma</span> users are saying
      </h1>

      <div className="w-full grid grid-cols-1 grid-rows-1 justify-between items-start gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map(({ user, review, rating, date, location }, i) => (
          <div className="w-full" key={user}>
            <div className="flex items-start justify-start gap-4">
              <div className="relative min-w-12 min-h-12">
                <Image
                  fill={true}
                  src={`/images/user-${i + 1}.png`}
                  alt={user}
                  className="rounded-full object-cover object-center"
                />
              </div>

              <div>
                <div className="flex flex-col justify-start items-start">
                  <p className="font-semibold text-lg">{user}</p>
                  <p className="capitalize">
                    {location} | {months[new Date(date).getMonth() + 1]}{" "}
                    {new Date(date).getFullYear()}
                  </p>
                  <div className="flex justify-between items-center gap-2">
                    {Array.from({ length: 5 }, (_, i) =>
                      i + 1 <= rating ? (
                        <Star
                          key={i + 1}
                          className="text-primary"
                          fill="hsl(var(--primary))"
                          width={18}
                          height={18}
                        />
                      ) : (
                        <Star
                          key={i + 1}
                          className="text-primary"
                          width={18}
                          height={18}
                        />
                      )
                    )}
                  </div>
                </div>
                <p className="text-justify">{review}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Reviews;

import { Star } from "lucide-react";

interface VideoTestimonial {
  id: number;
  name: string;
  business: string;
  quote: string;
  youtubeId: string;
}

const videoTestimonials: VideoTestimonial[] = [
  { id: 1, name: "Ramesh Kumar", business: "Plumber", quote: "Got 60 calls in 30 days", youtubeId: "K4TOrB7at0Y" },
  { id: 2, name: "Dr. Priya", business: "Clinic", quote: "Appointment system changed my practice", youtubeId: "pX5w7VbOc2E" },
  { id: 3, name: "Anand Sweets", business: "Restaurant", quote: "Online orders during Diwali saved us", youtubeId: "1hHMwLxN6EM" }
];

export function VideoTestimonials() {
  return (
    <section className="">
    {/* // <section className="py-24 md:py-32"> */}
      {/* <div className="container max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-[clamp(2rem,6vw,3.5rem)] font-display font-bold">Don't Trust Us. Trust Them.</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {videoTestimonials.map((video) => (
            <div key={video.id} className="bg-white border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative aspect-video bg-gray-100">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={`${video.name} testimonial`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 text-yellow-500 text-sm mb-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <h3 className="text-lg font-bold">{video.name} • {video.business}</h3>
                <p className="text-sm text-muted-foreground mt-2">"{video.quote}"</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </section>
  );
}

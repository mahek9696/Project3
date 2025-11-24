import React from "react";
import img from "../..//assets/charkha_240x240.webp";

export default function ProcessPage() {
  const videoId = "uslx0Mxn-E8";
  const startSeconds = 232;
  const embedUrl = `https://www.youtube.com/embed/${videoId}?start=${startSeconds}&rel=0`;

  return (
    <div className="min-h-screen bg-gray-50 py-12 font-montserrat">
      <div className="max-w-6xl mx-auto px-4">
        <section className="mt-10 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-red-950">
            Khadi – An Important National Icon of the Freedom Movement
          </h2>

          <p className="text-center text-gray-700 mb-8">
            Khadi was introduced to the people of undivided India in 1918 in
            order to achieve self-sufficiency and independence from British
            textiles. Khadi movement, a socio-cultural narrative, was launched
            by Gandhiji from the Satyagraha Ashram in May 1915, popularly known
            as the Sabarmati Ashram, in the Ahmedabad district, Gujarat. Derived
            from the term khaddar, khadi is a handspun and hand-woven cotton
            cloth, which became one of the symbols of India’s freedom struggle.
            Mahatma Gandhi is said to have coined the term khadi for these
            fabrics owing to their coarse texture.
          </p>
          <img
            src={img}
            alt="Khadi Fabric"
            className="w-2/3 h-1/3 mx-auto mb-8 rounded shadow-md p-10"
          />
          <p className="text-center text-lg text-gray-700 mb-8">
            Khadi is spun using a charkha or an Indian spinning wheel. The
            charkha also became a prominent icon on the Indian national flag
            designed in the 1930s. Gandhiji promoted the use of Swadeshi
            products and urged boycotting foreign goods. Very soon, khadi became
            popular as the fabric of nationalism, and was said to be woven with
            “the threads of Swaraj”. As the idea of spinning khadi spread across
            India, Mahatma Gandhi hoped for unity among all classes through this
            common occupation by diluting the gap which existed between the
            people.
          </p>
        </section>
        {/* Responsive video wrapper */}
        <div className="w-full rounded-md overflow-hidden shadow-lg p-10">
          <div
            style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}
          >
            <iframe
              src={embedUrl}
              title="Process - Making Thread from Cotton rounded"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                border: 0,
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>

        <section className="mt-10 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-red-950">
            About this video
          </h2>
          <p className="text-gray-700">
            This video demonstrates the traditional process of spinning cotton
            into thread using a charkha.
          </p>
        </section>

        <section className="mt-10 bg-white p-6 rounded-md shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-red-950">
            Significance of Khadi in India
          </h2>
          <p className="text-gray-700">
            Thus, the khadi movement was established for social and economic
            reasons. The essence of this movement lies in Gandhiji’s
            understanding of the fabric as something that could uplift the
            masses. Khadi, therefore, became the national fabric of India and a
            central icon of India’s freedom struggle.
          </p>
        </section>
      </div>
    </div>
  );
}

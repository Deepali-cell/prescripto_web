export const Aboutus2 = () => {
  return (
    <>
      <div className="mt-12">
        <h1 className="font-bold text-2xl my-6 text-center">Why Choose Us</h1>

        <div
          className="
          grid grid-cols-1 
          md:grid-cols-3 
          gap-6
          "
        >
          <div className="border px-6 py-8 text-left hover:bg-blue-400 hover:text-white transition rounded">
            <h1 className="font-medium py-4">EFFICIENCY:</h1>
            <p>
              Streamlined appointment scheduling that fits into your busy
              lifestyle.
            </p>
          </div>

          <div className="border px-6 py-8 text-left hover:bg-blue-400 hover:text-white transition rounded">
            <h1 className="font-medium py-4">CONVENIENCE:</h1>
            <p>
              Access to a network of trusted healthcare professionals in your
              area.
            </p>
          </div>

          <div className="border px-6 py-8 text-left hover:bg-blue-400 hover:text-white transition rounded">
            <h1 className="font-medium py-4">PERSONALIZATION:</h1>
            <p>
              Tailored recommendations and reminders to help you stay on top of
              your health.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

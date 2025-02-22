import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full">
      <video
        src={src}
        loop
        muted
        autoPlay
        className="absolute left-0 top-0 size-full object-cover object-center"
      />
      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-blue-50">
        <div>
          <h1 className="bento-title special-font">{title}</h1>
          {description && (
            <p className="mt-3 max-w-64 text-xs text-gray-500 md:text-base">{description}</p>
          )}
        </div>

        {isComingSoon && (
          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20">coming soon</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Features = () => (
  <section className="bg-black pb-52">
    <div className="container mx-auto px-3 md:px-10">
      <div className="px-5 py-32">
        <p className="font-circular-web text-lg text-blue-50">
          Our Mission
        </p>
        <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-50">
        To revolutionize the way businesses showcase their spaces and ideas. We aim to blend creativity with innovation technology, delivering high quality visual media that captivates, engages and ultimately, converts.
        </p>
      </div>
      <div className="text-center">
        <h2 className="mb-15 text-[40px] text-gray-100 font-bold uppercase "><b>Why Choose Us</b></h2>
      </div>

      <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
        <BentoCard
          src="https://firebasestorage.googleapis.com/v0/b/homeify-auth.appspot.com/o/video%2Ffeature-1.mp4?alt=media&token=839bb938-927a-4536-86ff-63ee3fbcdc5a"
          title={
            <>
              Immersiv<b>e</b> 3D <br/> virtual tours
            </>
          }
          description="Captivate your audience with lifelike tours that engage, inspire, and convert."
          ComingSoon
        />
      </BentoTilt>

      <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
        <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
          <BentoCard
            src="https://firebasestorage.googleapis.com/v0/b/homeify-auth.appspot.com/o/video%2Ffeature-2.mp4?alt=media&token=4619ab04-f479-40f3-b448-009cfdf4a2b1"
            title={
              <p className="text-black">
                Stun<b>n</b>ing <br/> 3D renders
              </p>
            }
            description="Perfect for architects, designers, and developers looking to present their projects in vivid detail."
            ComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
          <BentoCard
            src="https://firebasestorage.googleapis.com/v0/b/homeify-auth.appspot.com/o/video%2Ffeature-3.mp4?alt=media&token=ba16f05c-6d57-44db-ac0b-d08ee706c77b"
            title={
              <>
                C<b>u</b>stom Media <br/> Solutions
              </>
            }
            description="Seamless videos and images tailored to tell your story in style."
            ComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
          <BentoCard
            src="https://firebasestorage.googleapis.com/v0/b/homeify-auth.appspot.com/o/video%2Ffeature-4.mp4?alt=media&token=be5e8eb3-d6b1-4281-afe7-b3fa4c22be55"
            title={
              <>
                ad<b>v</b>anced Technology
              </>
            }
            description="Leverage the latest innovations for unmatched quality and detail."
            ComingSoon
          />
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <div className="flex size-full flex-col justify-between bg-violet-300 p-5">
            <h1 className="bento-title special-font max-w-64 text-black">
            <b>1:1 Exact Scale Floor Projection</b> is Co<b>m</b>ing s<b>o</b>on!!!
            </h1>

            <TiLocationArrow className="m-5 scale-[5] self-end" />
          </div>
        </BentoTilt>

        <BentoTilt className="bento-tilt_2">
          <video
            src="https://firebasestorage.googleapis.com/v0/b/homeify-auth.appspot.com/o/video%2Ffeature-5.mp4?alt=media&token=9adfc4d7-c76d-4693-a014-865a8e42daa0"
            loop
            muted
            autoPlay
            className="size-full object-cover object-center"
          />
        </BentoTilt>
      </div>
    </div>
  </section>
);

export default Features;

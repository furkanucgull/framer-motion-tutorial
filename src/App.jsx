import {
  motion,
  useAnimation,
  useInView,
  useScroll,
  useTransform,
} from "framer-motion";
import {useEffect, useRef, useState} from "react";

const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.25 } },
};
const gridSquareVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const App = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { scrollYProgress: completionProgress } = useScroll();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const mainControls = useAnimation();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const paragraphOneValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["-100%", "0%"],
  );

  const paragraphTwoValue = useTransform(
    scrollYProgress,
    [0, 1],
    ["100%", "0%"],
  );
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <>
      <div className="flex flex-col w-fit gap-10 min-h-screen relative ">
        <motion.div
            style={{width}}
            className="text-white w-full  bg-emerald-300 h-2 top-0 sticky z-10"></motion.div>
        <motion.section
          variants={gridContainerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-3  gap-10"
        >
          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
          >
            <motion.div
              className=" w-20 h-20 bg-stone-100 rounded-lg"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            ></motion.div>
            <motion.div
              className=" w-20 h-20 bg-stone-100 rounded-full"
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            ></motion.div>
          </motion.div>

          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
          >
            <motion.div
              className="w-1/3 h-1/3 shadow-md bg-rose-400 "
              animate={{
                scale: [1, 2, 2, 1],
                rotate: [0, 90, 90, 0],
                borderRadius: ["10%", "10%", "50%", "10%"],
              }}
              transition={{
                duration: 5,
                ease: "easeIn",
                repeat: 3,
                repeatDelay: 1,
              }}
            ></motion.div>
          </motion.div>

          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
          >
            <motion.button
              onTap={() => setIsClicked((prevState) => !prevState)}
              className="bg-emerald-300 w-1/2 py-4 rounded-lg text-2xl text-gray-900 font-light tracking-wide"
              whileTap={{ scale: 0.9, backgroundColor: "#862828", x: 0, y: 0 }}
              whileDrag={{ backgroundColor: "red" }}
              whileHover={{
                scale: 1.1,
                backgroundColor: "#163242",
                color: "white",
              }}
              transition={{ bounceDamping: 10, bounceStiffness: 600 }}
              initial={{ x: 0, y: 0 }}
              drag
            >
              {!isClicked ? (
                "Subscribe"
              ) : (
                <motion.p
                  initial={{ x: -100, y: -8 }}
                  animate={{ x: 35, y: -8 }}
                  transition={{
                    duration: 0.25,
                    ease: "easeIn",
                  }}
                  className="text-white p-4 h-12 w-12"
                >
                  Subscribed!!!!
                </motion.p>
              )}
            </motion.button>
          </motion.div>

          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
          >
            <motion.div className="w-40 aspect-square bg-gray-50/20 rounded-xl">
              <motion.div
                className="w-full bg-gray-400 rounded-xl h-full origin-bottom "
                style={{ scaleY: completionProgress }}
              ></motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-1/2 stroke-amber-500 stroke-[0.5]"
            >
              <motion.path d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
            </motion.svg>
          </motion.div>

          <motion.div
            variants={gridSquareVariants}
            className="bg-slate-800 aspect-square rounded-lg justify-center flex items-center gap-10"
          ></motion.div>
        </motion.section>
        <section className="flex flex-col gap-10 mb-10" ref={containerRef}>
          <motion.h1
            className="text-5xl tracking-wide text-slate-100 text-center"
            animate={mainControls}
            initial="hidden"
            variants={{
              hidden: { opacity: 0, y: 75 },
              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            transition={{ delay: 0.3 }}
          >
            Just Keep Scrolling
          </motion.h1>
          <motion.p
            style={{ translateX: paragraphOneValue }}
            className="text-slate-100 font-thin text-4xl w-1/2 mx-auto"
          >
            This is a basic tutorial on how to get up and running with Framer
            Motion with some TailwindCSS. If you enjoyed this video, please
            leave a like and also subscribe.
          </motion.p>
          <motion.p
            style={{ translateX: paragraphTwoValue }}
            className="text-slate-100 font-thin text-4xl w-1/2 mx-auto"
          >
            Have fun playing with Framer Motion. It is a very powerful library,
            when used properly. Add some life to your websites.
          </motion.p>
        </section>
      </div>
    </>
  );
};
export default App;

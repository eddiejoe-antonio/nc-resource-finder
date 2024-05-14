import illustration from '../assets/about.jpg';

const About = () => {
  return (
    <div className='w-full px-0 md:px-28 py-4'>
      <hr className='border-t-1 border-black' />
      <div className='flex flex-col md:flex-row md:space-x-12 pb-8'>
        <div className='flex-1'>
          <section className='py-8 mb-4'>
            <h2 className='text-[1.25rem] md:text-[1.5rem] font-black text-[#092940] uppercase mb-4'>
              How Did North Carolina Gather These Resources?
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquam sagittis
              augue, vitae convallis massa venenatis vel. Integer elementum id ligula vitae congue.
              Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </p>
          </section>
          <section>
            <h2 className='text-[1.25rem] md:text-[1.5rem] font-black text-[#092940] uppercase mb-8'>
              How Can I Add Or Update Information On A Resource?
            </h2>
            <p className='pb-2'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent aliquam sagittis
              augue, vitae convallis massa venenatis vel. Integer elementum id ligula vitae congue.
              Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            </p>
            <button className='bg-[#1E79C8] text-white py-2 px-4 rounded-full mt-4 hover:bg-[#3892E1]'>
              Contribute to the Dataset
            </button>
          </section>
        </div>
        <div className='flex-1 flex flex-col justify-between'>
          <img
            src={illustration}
            alt='Resource and Contribution Illustration'
            className='w-full h-full object-cover mt-8 mb-8 md:mb-0'
          />
        </div>
      </div>
    </div>
  );
};

export default About;

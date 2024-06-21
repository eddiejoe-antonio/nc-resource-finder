import React, { useEffect, useRef } from 'react';
import illustration from '../assets/about.jpg';

interface AboutModalProps {
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstFocusableElementRef = useRef<HTMLButtonElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  const handleTabKey = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      const focusableElements = modalRef.current?.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusableElements) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleTabKey);
    firstFocusableElementRef.current?.focus();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleTabKey);
    };
  }, []);

  const handleContributeClick = () => {
    window.open('https://ncsu.qualtrics.com/jfe/form/SV_cHfEQwInm8UprWC', '_blank');
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
      <div
        ref={modalRef}
        className='bg-white rounded-md overflow-hidden shadow-lg w-full max-w-6xl mx-4 md:mx-auto max-h-[80vh] md:max-h-[90vh] lg:max-h-[100vh] md:p-4'
      >
        <div className='flex justify-end px-4 py-2'>
          <button
            ref={firstFocusableElementRef}
            className='bg-[#1E79C8] text-white py-2 px-4 rounded-full hover:bg-[#3892E1]'
            onClick={onClose}
            aria-label='Close modal'
          >
            <span className='text-xl'>&times;</span>
            <span> Close Pop Up</span>
          </button>
        </div>
        <div className='px-6 pt-2 pb-6 overflow-y-auto max-h-[80vh]'>
          <div className='flex flex-col md:flex-row md:space-x-12 pb-8'>
            <div className='flex-1'>
              <section className='mb-4'>
                <h2 className='text-[1.125rem] md:text-[1.5rem] font-black text-[#092940] uppercase mb-4'>
                  How Did North Carolina Gather These Resources?
                </h2>
                <p>
                  The North Carolina Office of Digital Equity & Literacy (ODEL) gathered the
                  resources in this site as part of the process to develop North Carolina’s{' '}
                  <a
                    href='https://www.ncbroadband.gov/Digital-Equity-Plan'
                    target='_blank'
                    rel='noopener noreferrer'
                    className=' text-[#092940] underline md:hover:text-[#1E79C8] transition-colors ease-in-out duration-300'
                  >
                    State Digital Equity Plan
                  </a>{' '}
                  in 2023. Community members, digital navigators, academic partners, state agencies,
                  and everyday North Carolinians contributed to the dataset.
                </p>
              </section>
              <section>
                <h2 className='text-[1.125rem] md:text-[1.5rem] font-black text-[#092940] uppercase mb-8'>
                  How Can I Add Or Update Information On A Resource?
                </h2>
                <p className='pb-2'>
                  The State is committed to keeping information on digital equity resources correct
                  and current. Please click on the form below to submit a correction or update to
                  any information you see on this site. ODEL and its partners will review
                  submissions for accuracy and duplications before integrating them into the site.
                </p>
                <button
                  className='bg-[#1E79C8] text-white py-2 px-4 rounded-full mt-4 hover:bg-[#3892E1]'
                  onClick={handleContributeClick}
                >
                  Contribute to the dataset
                </button>
              </section>
              <section className='mt-8 mb-4'>
                <h2 className='text-[1.125rem] md:text-[1.5rem] font-black text-[#092940] uppercase mb-4'>
                  HOW CAN I USE THE APP?
                </h2>
                <p>
                  You can use the Tech Resource Finder to identify a digital equity resource in your
                  community, where a loved one resides, or in a location you are visiting. You can
                  use this tool to direct others to the resources that they need to thrive. You can
                  help ODEL enrich this dataset and stay up to date on what is happening across the
                  state.
                </p>
              </section>
              <section className='mb-4'>
                <h2 className='text-[1.125rem] md:text-[1.5rem] font-black text-[#092940] uppercase mb-4'>
                  I’M HAVING TROUBLE USING THE APP. WHAT SHOULD I DO?
                </h2>
                <p>
                  If you are having trouble using the app, please review the training video
                  available at this{' '}
                  <a
                    href='/'
                    target='_blank'
                    rel='noopener noreferrer'
                    className=' text-[#092940] underline md:hover:text-[#1E79C8] transition-colors ease-in-out duration-300'
                  >
                    link.
                  </a>{' '}
                  Additionally, if you exit out of this pop-up window, you can access the training
                  video on the bottom left hand of the screen by clicking on the button with a “?”
                  icon in it.
                </p>
              </section>
            </div>
            <div className='flex-1 flex flex-col justify-between'>
              <img
                src={illustration}
                alt='Resource and Contribution Illustration'
                className='w-full h-full object-cover mt-8 md:mt-0 mb-8 md:mb-0'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutModal;

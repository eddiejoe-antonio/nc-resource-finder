import aboutAsset from '@/assets/ResourceFinder.jpg';
import { RightArrowIcon } from '../IconSvg';

const AboutAssetInventory = () => (
  <div className='flex min-h-screen max-w-screen-xl px-4 lg:px-8 m-auto py-10 items-center'>
    <div className='flex w-full flex-col lg:flex-row gap-16'>
      <div className='flex flex-col w-full lg:w-1/2'>
        <div className='flex flex-col'>
          <h3 className='font-semibold text-[1.8rem] subpixel-antialiased'>
            About the Resource Finder
          </h3>
          <p className='py-3 text-black'>
            Looking for organizations or local governments providing digital resources like free
            Wi-Fi access, digital skills class, or devices? The Texas Digital Opportunity Resource
            Hub can help anyone find digital opportunity resources.
          </p>
        </div>
        <div className='flex flex-col'>
          <p className='text-black'>
            The information in the Resource Finder comes from a survey that the BDO circulated to
            Texas agencies and organizations working to advance digital opportunity. Because this
            information is crowdsourced, it may not be 100% complete. We invite you to help keep the
            information up to date and as comprehensive as possible.
          </p>
          <div className='pt-6'>
            <h3 className='font-semibold text-[1.8rem] subpixel-antialiased py-4'>
              What Makes the Resource Finder Unique
            </h3>
            <p className='py-2 text-black'>
              On this site, Texans can find the resources they need within their communities or
              learn about what organizations in other parts of the state are doing. It is a work in
              progress that will expand as people interested in advancing digital opportunity add
              information. In this way, the Resource Finder is a unique, crowdsourced dataset that
              helps the BDO deliver on its commitment to maintaining a living digital opportunity
              plan for all Texans.
            </p>
          </div>
          <div className='pt-6'>
            <h3 className='font-semibold text-[1.8rem] subpixel-antialiased py-4'>
              Contributing to the Resource Finder
            </h3>
            <p className='pt-2 pb-4 text-black'>
              The DRMTS was widely disseminated over a four-month period, from April to August 2023,
              and leveraged the BDO public engagement model to reach state, county and local
              agencies, councils of governments (COGs), CBOs, nonprofits, faith-based groups, CAIs
              and private sector companies. The BDO conducted desktop research to supplement survey
              responses with publicly available information on organizations.
            </p>
            <p className='pt-2 pb-4 text-black'>
              However, not every digital resource is represented by this dataset. The BDO welcomes
              your continued engagement on the task of gathering resources across the state. If you
              are aware of a digital resource that is not listed on this site, you are welcome to
              submit it for review at the below link.
            </p>
            <a
              href='https://airtable.com/appbal6AbAyP6G2la/shrrej5ygBW70ekxL'
              target='_blank'
              rel='noopener'
              className='bg-[#002768] gap-2 md:hover:bg-[#fff] md:hover:text-[#002768] transition-colors duration-300 text-[#fff] text-[1rem]  me-2 px-2.5 py-1 rounded-md border-2 border-[#002768] inline-flex items-center justify-center'
            >
              Contribute an Asset <RightArrowIcon />
            </a>
          </div>
        </div>
      </div>
      <div className='w-full lg:w-1/2 flex justify-center'>
        <img src={aboutAsset} alt='An image of the San Antonio skyline.' className='object-cover' />
      </div>
    </div>
  </div>
);

export default AboutAssetInventory;

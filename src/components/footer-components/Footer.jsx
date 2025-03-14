import Logo from '../../assets/logo/icon-black.png';

export default function Footer() {
  return (
    <div className='mt-32'>
      <div className='bg-white text-black px-20 py-16 rounded-4xl shadow-[0_-8px_50px_rgba(20,110,245,0.50)]'>
        <div className='flex justify-between items-center'>
          <div className='w-3/5'>
            <div className='flex items-center gap-2'>
              <img src={Logo} alt='logo' className='w-8' />
              <h1 className='text-3xl font-semibold'>OpticScan</h1>
            </div>

            <p className='mt-8'>
              With a clear vision of improving global health, OpticScan empowers
              both patients and healthcare providers with the tools to manage
              eye health proactively, ensuring better outcomes and enhancing the
              overall quality of care.
            </p>

            <a href='' className='block mt-6 font-semibold'>
              Learn more {'>>'}
            </a>
          </div>

          <div className='w-1/5'>
            <h4 className='font-semibold text-2xl'>Sitemap</h4>

            <ul className='mt-6 text-sm'>
              <li>
                <a href='#what-we-offer'>What We Offer</a>
              </li>
              <li className='mt-4'>
                <a href='#about-us'>About Us</a>
              </li>
              <li className='mt-4'>
                <a href='#how-it-works'>How It Works</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <p className='text-center py-10'>
        © 2025 OpticScan. HUMIC Enginnering All rights reserved
      </p>
    </div>
  );
}

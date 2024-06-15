import Footer from '../components/Footer';
import MenuChip from '../components/MenuChip';
import TopBar from '../components/TopBar';
import Chruch from '../../img/church.png';
import cloud from '../../img/cloud.png';

function Home() {
  return (
    <div className="ring-4 ring-bgSecondary p-10 rounded-xl">
      <TopBar />
      <div className="pt-6">
        <div className="flex gap-3">
          <img alt="Church Icon" src={Chruch} />
          <h2 className="text-textPrimary font-bold text-2xl">
            Church Services
          </h2>
        </div>
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 md:gap-x-40 gap-10">
          <MenuChip
            title="Normal Form"
            route="/form-1"
            description="Description"
          />
          <MenuChip
            title="Special Form"
            route="/form-2"
            description="Description"
          />
          {/* <MenuChip
            title="Certificates"
            route="/certificates"
            description="Description"
          /> */}
          <MenuChip
            title="Normal Form Report"
            route="/reportNF"
            description="Description"
          />
          <MenuChip
            title="Special Form Reports"
            route="/reportSF"
            description="Description"
          />
        </div>
        <div className="py-4">
          <div className="flex gap-4">
            <img className="w-6 h-5" src={cloud} alt="Cloud Icon" />
            <h2 className="text-textPrimary font-bold text-2xl">
              Cloud Services
            </h2>
          </div>
          <div className="py-4 grid grid-cols-1 md:grid-cols-2 md:gap-x-40 gap-10">
            <MenuChip
              title="Sync to Cloud"
              route="/"
              description="Description"
            />
            <MenuChip
              title="Backup from Cloud"
              route="/"
              description="Description"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;

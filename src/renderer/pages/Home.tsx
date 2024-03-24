import MenuChip from '../components/MenuChip';

function Home() {
  return (
    <div className="ring-4 ring-bgSecondary p-10 rounded-xl">
      <div className="bg-bgOther px-10 py-10 rounded-xl text-textPrimary">
        <h2 className="font-extrabold text-2xl">Holy Family Church</h2>
        <p className="font-medium">Avittathur</p>
      </div>
      <div className="pt-6">
        <h2 className="text-textPrimary font-bold text-2xl">Church Services</h2>
        <div className="py-10 grid grid-cols-1 md:grid-cols-2 md:gap-x-40 gap-10">
          <MenuChip
            title="Form - 1"
            route="/form-1"
            description="Description"
          />
          <MenuChip
            title="Form - 2"
            route="/form-2"
            description="Description"
          />
          <MenuChip
            title="Certificates"
            route="/certificates"
            description="Description"
          />
          <MenuChip
            title="Reports"
            route="/reports"
            description="Description"
          />
        </div>
        <div className="py-4">
          <h2 className="text-textPrimary font-bold text-2xl">
            Cloud Services
          </h2>
          <div className="py-4 grid grid-cols-1 md:grid-cols-2 md:gap-x-40 gap-10">
            <MenuChip
              title="Sync to Cloud"
              route="/form-1"
              description="Description"
            />
            <MenuChip
              title="Backup from Cloud"
              route="/form-2"
              description="Description"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

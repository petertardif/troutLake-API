const arrOfOwners = [
  {
    id: "1",
    last_name: "Tardif",
    first_name: "Peter",
    email: "peter.tardif@gmail.com",
    password: "@tardif4402",
    phone_number: "3033744787"
  },
  {
    id: "2",
    last_name: "Weil",
    first_name: "Maryann",
    email: "weil.maryann@gmail.com",
    password: "tladmin1",
    phone_number: "7202732551"
  }
]

const sites = [
  {
    id: "1",
    trout_lake_water: true,
    owners: [
      {
        id: "1"
      }
    ]
  },
  {
    id: "2",
    trout_lake_water: true,
    owners: [
      {
        id: "2"
      }
    ]
  }
]

module.exports = {
  arrOfOwners,
  sites,
};
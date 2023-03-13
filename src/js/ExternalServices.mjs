const baseURL = "http://localhost:3000/";
//http://localhost:3000/data/1

async function convertToJson(res) {
  const data = await res.json();
  if (res.ok) {
    return data;
  } else {
    throw { name: "servicesError", message: data };
  }
}

export default class ExternalServices {
  constructor() {}

  async findOrderById(id) {
      const response = await fetch(baseURL + `data/${id}`);
      const data = await convertToJson(response);
    return data;
  }
}

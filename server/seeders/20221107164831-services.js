'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
     await queryInterface.bulkInsert('product_services', [
      {id: 1, service: 'Brotas Eco Hotel Fazenda', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 2, service: 'Brotas Eco Resort', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 3, service: 'CEU', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 4, service: 'Escolas/Temporadas', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 5, service: 'Geral', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 6, service: 'Peraltas', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'}

    ], {});
  },

  async down (queryInterface, Sequelize) {
   
    await queryInterface.bulkDelete('product_services', null, {});
  }
};

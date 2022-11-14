'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('product_types', [
      {id: 1,  type: 'Camiseta', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 2,  type: 'Camiseta Dry fit', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 3,  type: 'Capa de Junção', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 4,  type: 'Edredom', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 5,  type: 'Fronha', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 6,  type: 'Jaquetas', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 7,  type: 'Lençol', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 8,  type: 'Manta', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 9,  type: 'Moleton', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 10, type: 'Piso', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 11, type: 'Protetor de Xixi', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 12, type: 'Saia da Cama', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 13, type: 'Toalha de Banho', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 14, type: 'Toalha de mesa', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 15, type: 'Travesseiro', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 23, type: 'Camisa Polo', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 24, type: 'Calça', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 25, type: 'Doma', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 26, type: 'Avental Plástico', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 27, type: 'Avental de Corpo', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 28, type: 'Avental Meio Corpo', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 29, type: 'Jaleco Camareira', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 30, type: 'Calça Camareira', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 31, type: 'Bermuda', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 33, type: 'Calça Social', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 34, type: 'Camisa Social', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 35, type: 'Camisa Gola', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 36, type: 'Camiseta manga longa', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 37, type: 'Camiseta sem manga ', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'},
      {id: 38, type: 'Camisa social manga longa', created_at: '2022-11-06 01:51:07.257000 +00:00', updated_at: '2022-11-06 01:51:07.257000 +00:00'}
    ], {});
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('product_types', null, {});
  }
};

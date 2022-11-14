'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('departments', [
      {
        id: 1,
        department: 'Monitoria',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      },{
        id: 2,
        department: 'Cozinha',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      }, {
        id: 3,
        department: 'Jardinagem',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      }, {
        id: 4,
        department: 'Manutenção',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      }, {
        id: 5,
        department: 'Recepção',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      }, {
        id: 6,
        department: 'Portaria',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      }, {
        id: 7,
        department: 'Governança',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      },{
        id: 8,
        department: 'Salão/Bar',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      },{
        id: 9,
        department: 'Operacional',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      }, {
        id: 10,
        department: 'Financeiro',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      }, {
        id: 11,
        department: 'Recursos Humanos',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      },{
        id: 12,
        department: 'Fazenda',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      }, {
        id: 13,
        department: 'Comercial',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      }, {
        id: 14,
        department: 'Lavanderia',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      }, {
        id: 15,
        department: 'Costura',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      }, {
        id: 16,
        department: 'CEU',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      }, {
        id: 17,
        department: 'Tecnica ',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      }, {
        id: 18,
        department: 'Enfermaria',
        created_at: '2022-11-06 01:51:07.257000 +00:00',
        updated_at: '2022-11-06 01:51:07.257000 +00:00'
      }
    ], { });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('departments', null, {});
}
};

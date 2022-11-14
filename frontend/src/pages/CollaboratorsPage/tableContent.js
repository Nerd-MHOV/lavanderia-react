
export const makeLines = async (arrayLine) => {
    const arrLines = await arrayLine.map(el => {
        return {
            id: el.id,
            name: el.collaborator,
            department: el.department.department,
            type: el.mensalista ? 'mensalista' : 'diarista',
            status: el.active,
            fingerprint: el.fingerprint,
            cpf: el.cpf,
        }
    })

    return arrLines;
}

export const makeOptionsDepartments = async (arrDepartment) => {
    const listDepartment = await arrDepartment.map( el => {
        return { value: el.department, label: el.department, id: el.id}
    })
    //setOptionsDepartments(listDepartment);
    return listDepartment;
}

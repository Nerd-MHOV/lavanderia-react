import { useCallback } from "react";

export const useFakeMutation = () => {
    return useCallback(
        (user) =>
            new Promise((resolve, reject) =>
                setTimeout(() => {
                    if (user.name?.trim() === '') {
                        reject();
                    } else {
                        resolve(user);
                    }
                }, 200),
            ),
        [],
    );
};

export function computeMutation(newRow, oldRow) {
    if (newRow.name !== oldRow.name) {
        return `Nome de '${oldRow.name}' para '${newRow.name}'`;
    }
    if (newRow.age !== oldRow.age) {
        return `Age from '${oldRow.age || ''}' to '${newRow.age || ''}'`;
    }
    if (newRow.type !== oldRow.type) {
        return `Tipo do '${oldRow.name}' de '${oldRow.type || ''}' para '${newRow.type || ''}'`;
    }
    if (newRow.department !== oldRow.department) {
        return `Departamento do '${oldRow.name}' de '${oldRow.department || ''}' para '${newRow.department || ''}'`;
    }
    if (newRow.status !== oldRow.status) {
        console.log(newRow, oldRow)
        let oldStatus = oldRow.status ? 'Ativo' : 'desativado'
        let newStatus = newRow.status ? 'Ativo' : 'desativado'
        return `Status de '${oldStatus}' para '${newStatus}'`;
    }
    if (newRow.fingerprint !== oldRow.fingerprint && oldRow.fingerprint !== 0 ) {
        return `Status da digital do '${oldRow.name}' para 'não cadastrada'`;
    }
    return null;
}

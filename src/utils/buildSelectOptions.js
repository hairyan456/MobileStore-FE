
const buildSelectOptions = (dataArr) => {
    let results = [];
    if (dataArr?.length > 0) {
        results = dataArr.map((type) => ({
            value: type,
            label: type,
        }));
        results.push({ label: 'Add new type', value: 'add_type' })
    }
    return results;
};

export default buildSelectOptions
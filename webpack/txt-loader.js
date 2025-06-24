function txtLoader(code) {
    const newCode = code.replace(/code/g, 'var');
    return newCode;
}

export default txtLoader;
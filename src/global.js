const config = {
    keySet: {
        bucket: 'shoemanagement721',
        key: 'LTAIFOVERjHNxsJU',
        region: 'beijing',
        secret: 'xF9xWjqSyFiINibY1ClDvwiZbdaTcC'
    },
}

let bindToGlobal = (obj, key) => {
     if (typeof window[key] === 'undefined') {
         window[key] = {};
     }

     for (let i in obj) {
         window[key][i] = obj[i]
     }
}
bindToGlobal(config,'_const')
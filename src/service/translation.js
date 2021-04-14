import i18n from 'i18next';
import { useState, useEffect } from 'react';

const globalContext = {
    t: null,
    languageChangeListeners: [],
};

export const init = ({lang}, context = globalContext) => {
    return new Promise((resolve, reject) => {
        i18n.init({
            lng: lang,
            resources: {},
        }, (err, t) => {
            if (err) return reject(err);
            context.t = t;
            resolve();
        });
    });
};

export const getLocalizer = (context = globalContext) => context.t;

/**
 * 
 * @param {String} languageCode ISO 639-1 language code
 */
export const setLanguage = (languageCode, context = globalContext) => {
    i18n.changeLanguage(languageCode, ((err, t) => {
        if (err) {
            console.error(err); // eslint-disable-line no-console
            return;
        }

        context.languageChangeListeners.forEach(listener => listener(languageCode, t));
    }));
};

const addLanguageChangeListener = (listener, context = globalContext) => {
    context.languageChangeListeners.push(listener);
};

const removeLanguageChangeListener = (listener, context = globalContext) => {
    const index = context.languageChangeListeners.findIndex(l => l === listener);
    if (index === -1) {
        return;
    }
    context.languageChangeListeners = context.languageChangeListeners.splice(index, 1);
};

/**
 * Has to be called before i18n (via `global.t`) is called
 * @param {string} namespaceName 
 * @param {(string) => Promise<{[key: string]: string}>} resourcePromiseMaker 
 */
export const useTranslationNamespace = (namespaceName, resourcePromiseMaker) => {
    const [, setLoadCount] = useState(0);

    i18n.setDefaultNamespace(namespaceName);

    const loadBundle = () => {
        if (i18n.hasResourceBundle(i18n.language, namespaceName)) {
            i18n.loadNamespaces(namespaceName, () => {
                setLoadCount(lc => lc + 1);
            });

        } else {
            resourcePromiseMaker(i18n.language)
                .then(jsonFile => {
                    i18n.addResourceBundle(i18n.language, namespaceName, jsonFile);
                    i18n.loadNamespaces(namespaceName, () => {
                        setLoadCount(lc => lc + 1);
                    });
                });
        }
    };

    useEffect(() => {
        loadBundle();

        addLanguageChangeListener(loadBundle);
        return () => {
            removeLanguageChangeListener(loadBundle);
        };
    }, []);
};

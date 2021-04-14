import i18n from 'i18next';
import { useEffect } from 'react';

export const init = ({lang}) => {
    return new Promise((resolve, reject) => {
        i18n.init({
            lng: lang,
            resources: {},
        }, (err, t) => {
            if (err) return reject(err);

            global.t = t;
            resolve();
        });
    });
};

export const getLanguage = () => i18n.language;

/**
 * 
 * @param {String} languageCode ISO 639-1 language code
 */
export const setLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
};

export const useTranslationNamespace = (namespaceName, resourcePromise, onLoad = ()=>{}) => {
    useEffect(() => {
        i18n.setDefaultNamespace(namespaceName);

        if (i18n.hasResourceBundle(i18n.language, namespaceName)) {
            i18n.loadNamespaces(namespaceName, () => {
                onLoad();
            });

        } else {
            resourcePromise
                .then(jsonFile => {
                    i18n.addResourceBundle(i18n.language, namespaceName, jsonFile);
                    i18n.loadNamespaces(namespaceName, () => {
                        onLoad();
                    });
                });
        }

    }, [i18n.language]);
};

angular.module('openeApp.translations.init', []);

angular.module('openeApp.translations', ['pascalprecht.translate'])
        .factory('availableLanguages', AvailableLanguages)
        .config(config);

var availableLanguages = {
    keys: ['en', 'da'],
    localesKeys: {
        'en_US': 'en',
        'en_GB': 'en',
        'da_DK': 'da'
    }
};

function AvailableLanguages() {
    return availableLanguages;
}

function config($translateProvider, languageFilesProvider) {
    languageFilesProvider.addFile('app/src/i18n/','.json');
    $translateProvider.useStaticFilesLoader(languageFilesProvider.getLanguageFiles());

    $translateProvider.useSanitizeValueStrategy('sanitizeParameters');

    $translateProvider
            .registerAvailableLanguageKeys(availableLanguages.keys, availableLanguages.localesKeys)
            .determinePreferredLanguage();

    //set default language if browsers langugage not found
    if (availableLanguages.keys.indexOf($translateProvider.preferredLanguage()) === -1) {
        $translateProvider.preferredLanguage(availableLanguages.keys[0]);
    }
}
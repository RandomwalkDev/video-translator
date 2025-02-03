const LanguageSelector = ({ languages, selectedLanguage, onLanguageChange }) => {
    console.log(selectedLanguage)
  return (
    <div className="flex space-x-2">
      {languages.map((lang) => (
        <button className={`px-4 py-2 cursor-pointer rounded-md transition-all ${lang.toLowerCase() == selectedLanguage ? "bg-blue-500 text-white font-semibold":""}`}
          key={lang.toLowerCase()}
          onClick={() => onLanguageChange(lang.toLowerCase())}
          variant={selectedLanguage === lang.toLowerCase() ? "default" : "outline"}
        >
          {lang}
        </button>
      ))}
    </div>
  )
}

export default LanguageSelector


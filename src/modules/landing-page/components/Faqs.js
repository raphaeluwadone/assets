import React from 'react';
import '../styles/faq.css';
import Question from './Question';

function Faqs() {
  return (
    <div className="asset__faq">
        <div className="asset__faq-text">
            <h3>Frequently Asked Questions</h3>
            <p>Few of the things you need to know about AIMS</p>
        </div>
        <div className="asset__faqs">
            <Question title="Why should I use AIMS?  " info="AIMS software offers simple operational workflows that enables you to perform several functions with little or no assistance." />
            <Question title="Is my information secure?  " info="Absolutely yes it is, as AIMS software and data are securely hosted with multi levels data encryption." />
            <Question title="How are assets counted towards a package limit?  " info="Each subscription package has a limit for items that you can track. This limit is a sum of all uniquely identifiable assets,asset stock and inventory.individual stock quantities do not count towards a package limit." />
            <Question title="What kind of assets does AIMS track?  " info="AIMS can be used to track all types of fixed assets such as tools, equipment, phones, computers, office furniture, leases, inventory, art, collectibles and personal possessions." />
            <Question title="How do I add users?  " info="Users are added on  the user management page which can be accessed via the main menu." />
            <Question title="Can I upgrade my account later?  " info="Of course ,you can upgrade ,downgrade or cancel your account at any point in time with no extra charge." />
        </div>
    </div>
  )
}

export default Faqs
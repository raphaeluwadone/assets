import React from 'react';
import Card from './Card';
import '../styles/features.css';

function Features() {
  return (
    <div className='asset__features section__padding'>
        <div className='feature__container'>
            <div className='features__header'>
                <h3>Features</h3>
                <p>Be in absolute control of  your IT system using all this built-in asset management features.</p>
            </div>
            <div className='asset__feature-cards'>
                <Card title="REQUISITION MANAGEMENT" description="Manages the process of creating, processing, authorizing, and tracking purchase requests within an organization" />
                <Card title="API INTEGRATIONS" description="It interfaces easily and effectively with existing accounting packages and employee management solutions." />
                <Card title="BARCODING/RFID" description="Supports RFID tagging enabling assets to report their location and track their movements without human intervention." />
                <Card title="TIME ALERTS" description="Perimeter gate readers can trigger alarm or send messages when assets are moved at ungodly hours as specified by the administrator." />
                <Card title="AUDITS" description="Monitor regular checkpoints in the asset life cycle. Verify asset possession by having custodians acknowledge ownership or scan asset labels." />
                <Card title="CATEGORIES AND SUBCATEGORIES" description="Classify assets into categories and subcategories for clarity and ease of use. You can also define custom fields as well."/>
            </div>

        </div>
        
    </div>
  )
}

export default Features
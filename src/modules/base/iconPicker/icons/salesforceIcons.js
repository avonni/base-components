// This file needs to be in a separate folder,
// because it is too long to be processed by JSDoc.
// Else it will throw an error when the doc website runs its script.
const ICON_TYPES = [
    {
        title: 'Standard',
        value: 'standard',
        icons: [
            { title: 'account_info', value: 'standard:account_info' },
            { title: 'account_score', value: 'standard:account_score' },
            { title: 'account', value: 'standard:account' },
            {
                title: 'action_list_component',
                value: 'standard:action_list_component'
            },
            {
                title: 'actions_and_buttons',
                value: 'standard:actions_and_buttons'
            },
            { title: 'activation_target', value: 'standard:activation_target' },
            { title: 'activations', value: 'standard:activations' },
            { title: 'address', value: 'standard:address' },
            { title: 'agent_home', value: 'standard:agent_home' },
            { title: 'agent_session', value: 'standard:agent_session' },
            { title: 'aggregate', value: 'standard:aggregate' },
            {
                title: 'aggregation_policy',
                value: 'standard:aggregation_policy'
            },
            {
                title: 'ai_accelerator_card',
                value: 'standard:ai_accelerator_card'
            },
            { title: 'all', value: 'standard:all' },
            { title: 'announcement', value: 'standard:announcement' },
            { title: 'answer_best', value: 'standard:answer_best' },
            { title: 'answer_private', value: 'standard:answer_private' },
            { title: 'answer_public', value: 'standard:answer_public' },
            { title: 'apex_plugin', value: 'standard:apex_plugin' },
            { title: 'apex', value: 'standard:apex' },
            {
                title: 'app_form_participant',
                value: 'standard:app_form_participant'
            },
            {
                title: 'app_form_product_participant',
                value: 'standard:app_form_product_participant'
            },
            { title: 'app', value: 'standard:app' },
            { title: 'approval', value: 'standard:approval' },
            { title: 'apps_admin', value: 'standard:apps_admin' },
            { title: 'apps', value: 'standard:apps' },
            { title: 'article', value: 'standard:article' },
            {
                title: 'asset_action_source',
                value: 'standard:asset_action_source'
            },
            { title: 'asset_action', value: 'standard:asset_action' },
            { title: 'asset_audit', value: 'standard:asset_audit' },
            {
                title: 'asset_downtime_period',
                value: 'standard:asset_downtime_period'
            },
            { title: 'asset_hierarchy', value: 'standard:asset_hierarchy' },
            { title: 'asset_object', value: 'standard:asset_object' },
            {
                title: 'asset_relationship',
                value: 'standard:asset_relationship'
            },
            {
                title: 'asset_state_period',
                value: 'standard:asset_state_period'
            },
            { title: 'asset_warranty', value: 'standard:asset_warranty' },
            { title: 'assigned_resource', value: 'standard:assigned_resource' },
            { title: 'assignment', value: 'standard:assignment' },
            { title: 'attach', value: 'standard:attach' },
            {
                title: 'attribute_based_pricing',
                value: 'standard:attribute_based_pricing'
            },
            { title: 'avatar_loading', value: 'standard:avatar_loading' },
            { title: 'avatar', value: 'standard:avatar' },
            { title: 'bill_of_materials', value: 'standard:bill_of_materials' },
            { title: 'bot_training', value: 'standard:bot_training' },
            { title: 'bot', value: 'standard:bot' },
            { title: 'branch_merge', value: 'standard:branch_merge' },
            { title: 'brand', value: 'standard:brand' },
            { title: 'budget_allocation', value: 'standard:budget_allocation' },
            {
                title: 'budget_category_value',
                value: 'standard:budget_category_value'
            },
            { title: 'budget_period', value: 'standard:budget_period' },
            { title: 'budget', value: 'standard:budget' },
            { title: 'bundle_config', value: 'standard:bundle_config' },
            { title: 'bundle_policy', value: 'standard:bundle_policy' },
            { title: 'bundles_pricing', value: 'standard:bundles_pricing' },
            { title: 'business_hours', value: 'standard:business_hours' },
            { title: 'buyer_account', value: 'standard:buyer_account' },
            {
                title: 'buyer_group_qualifier',
                value: 'standard:buyer_group_qualifier'
            },
            { title: 'buyer_group', value: 'standard:buyer_group' },
            {
                title: 'calculated_insights',
                value: 'standard:calculated_insights'
            },
            { title: 'calibration', value: 'standard:calibration' },
            { title: 'call_coaching', value: 'standard:call_coaching' },
            { title: 'call_history', value: 'standard:call_history' },
            { title: 'call', value: 'standard:call' },
            { title: 'campaign_members', value: 'standard:campaign_members' },
            { title: 'campaign', value: 'standard:campaign' },
            { title: 'cancel_checkout', value: 'standard:cancel_checkout' },
            { title: 'canvas', value: 'standard:canvas' },
            { title: 'capacity_plan', value: 'standard:capacity_plan' },
            {
                title: 'care_request_reviewer',
                value: 'standard:care_request_reviewer'
            },
            { title: 'carousel', value: 'standard:carousel' },
            {
                title: 'case_change_status',
                value: 'standard:case_change_status'
            },
            { title: 'case_comment', value: 'standard:case_comment' },
            { title: 'case_email', value: 'standard:case_email' },
            { title: 'case_log_a_call', value: 'standard:case_log_a_call' },
            { title: 'case_milestone', value: 'standard:case_milestone' },
            { title: 'case_transcript', value: 'standard:case_transcript' },
            { title: 'case_wrap_up', value: 'standard:case_wrap_up' },
            { title: 'case', value: 'standard:case' }
        ],
        iconsExtended: [
            { title: 'catalog', value: 'standard:catalog' },
            { title: 'category', value: 'standard:category' },
            { title: 'change_request', value: 'standard:change_request' },
            {
                title: 'channel_program_history',
                value: 'standard:channel_program_history'
            },
            {
                title: 'channel_program_levels',
                value: 'standard:channel_program_levels'
            },
            {
                title: 'channel_program_members',
                value: 'standard:channel_program_members'
            },
            { title: 'channel_programs', value: 'standard:channel_programs' },
            { title: 'chart', value: 'standard:chart' },
            { title: 'checkout', value: 'standard:checkout' },
            { title: 'choice', value: 'standard:choice' },
            { title: 'client', value: 'standard:client' },
            { title: 'cms', value: 'standard:cms' },
            { title: 'coaching', value: 'standard:coaching' },
            { title: 'code_playground', value: 'standard:code_playground' },
            { title: 'code_set_bundle', value: 'standard:code_set_bundle' },
            { title: 'code_set', value: 'standard:code_set' },
            {
                title: 'collection_variable',
                value: 'standard:collection_variable'
            },
            { title: 'collection', value: 'standard:collection' },
            { title: 'connect_wallet', value: 'standard:connect_wallet' },
            { title: 'connected_apps', value: 'standard:connected_apps' },
            { title: 'constant', value: 'standard:constant' },
            { title: 'contact_list', value: 'standard:contact_list' },
            { title: 'contact_request', value: 'standard:contact_request' },
            { title: 'contact', value: 'standard:contact' },
            {
                title: 'contract_line_item',
                value: 'standard:contract_line_item'
            },
            {
                title: 'contract_line_outcome_data',
                value: 'standard:contract_line_outcome_data'
            },
            {
                title: 'contract_line_outcome',
                value: 'standard:contract_line_outcome'
            },
            { title: 'contract_payment', value: 'standard:contract_payment' },
            { title: 'contract', value: 'standard:contract' },
            { title: 'cost_model', value: 'standard:cost_model' },
            { title: 'coupon_codes', value: 'standard:coupon_codes' },
            {
                title: 'crypto_category_wallet_group',
                value: 'standard:crypto_category_wallet_group'
            },
            {
                title: 'crypto_product_category_wallet_role',
                value: 'standard:crypto_product_category_wallet_role'
            },
            { title: 'crypto_product', value: 'standard:crypto_product' },
            {
                title: 'crypto_transaction_envelope_change_snapshot',
                value: 'standard:crypto_transaction_envelope_change_snapshot'
            },
            {
                title: 'crypto_transaction_envelope_item',
                value: 'standard:crypto_transaction_envelope_item'
            },
            {
                title: 'crypto_transaction_envelope',
                value: 'standard:crypto_transaction_envelope'
            },
            {
                title: 'crypto_transaction',
                value: 'standard:crypto_transaction'
            },
            {
                title: 'crypto_wallet_group_item',
                value: 'standard:crypto_wallet_group_item'
            },
            {
                title: 'crypto_wallet_group',
                value: 'standard:crypto_wallet_group'
            },
            { title: 'crypto_wallet', value: 'standard:crypto_wallet' },
            { title: 'currency_input', value: 'standard:currency_input' },
            { title: 'currency', value: 'standard:currency' },
            {
                title: 'custody_chain_entry',
                value: 'standard:custody_chain_entry'
            },
            {
                title: 'custody_entry_verification',
                value: 'standard:custody_entry_verification'
            },
            { title: 'custody_override', value: 'standard:custody_override' },
            {
                title: 'custom_component_task',
                value: 'standard:custom_component_task'
            },
            {
                title: 'custom_notification',
                value: 'standard:custom_notification'
            },
            { title: 'custom', value: 'standard:custom' },
            { title: 'customer_360', value: 'standard:customer_360' },
            {
                title: 'customer_lifecycle_analytics',
                value: 'standard:customer_lifecycle_analytics'
            },
            {
                title: 'customer_portal_users',
                value: 'standard:customer_portal_users'
            },
            {
                title: 'customer_workspace',
                value: 'standard:customer_workspace'
            },
            { title: 'customer', value: 'standard:customer' },
            { title: 'customers', value: 'standard:customers' },
            {
                title: 'dashboard_component',
                value: 'standard:dashboard_component'
            },
            { title: 'dashboard_ea', value: 'standard:dashboard_ea' },
            { title: 'dashboard', value: 'standard:dashboard' },
            { title: 'data_cloud', value: 'standard:data_cloud' },
            { title: 'data_graph', value: 'standard:data_graph' },
            {
                title: 'data_integration_hub',
                value: 'standard:data_integration_hub'
            },
            { title: 'data_mapping', value: 'standard:data_mapping' },
            { title: 'data_model', value: 'standard:data_model' },
            { title: 'data_streams', value: 'standard:data_streams' },
            { title: 'data_transforms', value: 'standard:data_transforms' },
            { title: 'datadotcom', value: 'standard:datadotcom' },
            { title: 'dataset', value: 'standard:dataset' },
            { title: 'datashare_target', value: 'standard:datashare_target' },
            { title: 'datashares', value: 'standard:datashares' },
            { title: 'date_input', value: 'standard:date_input' },
            { title: 'date_time', value: 'standard:date_time' },
            { title: 'decision', value: 'standard:decision' },
            { title: 'default', value: 'standard:default' },
            { title: 'delegated_account', value: 'standard:delegated_account' },
            { title: 'device', value: 'standard:device' },
            {
                title: 'digital_verification_config_group',
                value: 'standard:digital_verification_config_group'
            },
            {
                title: 'digital_verification_config',
                value: 'standard:digital_verification_config'
            },
            {
                title: 'disclosure_and_compliance',
                value: 'standard:disclosure_and_compliance'
            },
            { title: 'discounts', value: 'standard:discounts' },
            { title: 'display_rich_text', value: 'standard:display_rich_text' },
            { title: 'display_text', value: 'standard:display_text' },
            { title: 'document_preview', value: 'standard:document_preview' },
            {
                title: 'document_reference',
                value: 'standard:document_reference'
            },
            { title: 'document', value: 'standard:document' },
            { title: 'drafts', value: 'standard:drafts' },
            {
                title: 'duration_downscale',
                value: 'standard:duration_downscale'
            },
            {
                title: 'dynamic_highlights_panel',
                value: 'standard:dynamic_highlights_panel'
            },
            {
                title: 'dynamic_record_choice',
                value: 'standard:dynamic_record_choice'
            },
            { title: 'education', value: 'standard:education' },
            { title: 'einstein_replies', value: 'standard:einstein_replies' },
            { title: 'email_chatter', value: 'standard:email_chatter' },
            { title: 'email', value: 'standard:email' },
            { title: 'employee_asset', value: 'standard:employee_asset' },
            { title: 'employee_contact', value: 'standard:employee_contact' },
            {
                title: 'employee_job_position',
                value: 'standard:employee_job_position'
            },
            { title: 'employee_job', value: 'standard:employee_job' },
            {
                title: 'employee_organization',
                value: 'standard:employee_organization'
            },
            { title: 'employee', value: 'standard:employee' },
            { title: 'empty', value: 'standard:empty' },
            { title: 'endorsement', value: 'standard:endorsement' },
            {
                title: 'entitlement_policy',
                value: 'standard:entitlement_policy'
            },
            {
                title: 'entitlement_process',
                value: 'standard:entitlement_process'
            },
            {
                title: 'entitlement_template',
                value: 'standard:entitlement_template'
            },
            { title: 'entitlement', value: 'standard:entitlement' },
            { title: 'entity_milestone', value: 'standard:entity_milestone' },
            { title: 'entity', value: 'standard:entity' },
            { title: 'environment_hub', value: 'standard:environment_hub' },
            { title: 'event', value: 'standard:event' },
            { title: 'events', value: 'standard:events' },
            {
                title: 'expense_report_entry',
                value: 'standard:expense_report_entry'
            },
            { title: 'expense_report', value: 'standard:expense_report' },
            { title: 'expense', value: 'standard:expense' },
            { title: 'facility_bed', value: 'standard:facility_bed' },
            { title: 'feed', value: 'standard:feed' },
            { title: 'feedback', value: 'standard:feedback' },
            { title: 'field_sales', value: 'standard:field_sales' },
            { title: 'file', value: 'standard:file' },
            {
                title: 'filter_criteria_rule',
                value: 'standard:filter_criteria_rule'
            },
            { title: 'filter_criteria', value: 'standard:filter_criteria' },
            { title: 'filter', value: 'standard:filter' },
            { title: 'first_non_empty', value: 'standard:first_non_empty' },
            { title: 'flow', value: 'standard:flow' },
            { title: 'folder', value: 'standard:folder' },
            { title: 'forecasts', value: 'standard:forecasts' },
            { title: 'form', value: 'standard:form' },
            { title: 'formula', value: 'standard:formula' },
            { title: 'fulfillment_order', value: 'standard:fulfillment_order' },
            {
                title: 'funding_award_adjustment',
                value: 'standard:funding_award_adjustment'
            },
            {
                title: 'funding_requirement',
                value: 'standard:funding_requirement'
            },
            { title: 'generic_loading', value: 'standard:generic_loading' },
            { title: 'global_constant', value: 'standard:global_constant' },
            { title: 'goals', value: 'standard:goals' },
            { title: 'group_loading', value: 'standard:group_loading' },
            { title: 'groups', value: 'standard:groups' },
            { title: 'guidance_center', value: 'standard:guidance_center' },
            { title: 'header_discounts', value: 'standard:header_discounts' },
            { title: 'hierarchy', value: 'standard:hierarchy' },
            {
                title: 'high_velocity_sales',
                value: 'standard:high_velocity_sales'
            },
            {
                title: 'historical_adherence',
                value: 'standard:historical_adherence'
            },
            {
                title: 'holiday_operating_hours',
                value: 'standard:holiday_operating_hours'
            },
            { title: 'home', value: 'standard:home' },
            { title: 'household', value: 'standard:household' },
            { title: 'identifier', value: 'standard:identifier' },
            { title: 'immunization', value: 'standard:immunization' },
            { title: 'impact_outcome', value: 'standard:impact_outcome' },
            {
                title: 'impact_strategy_assignment',
                value: 'standard:impact_strategy_assignment'
            },
            { title: 'impact_strategy', value: 'standard:impact_strategy' },
            { title: 'incident', value: 'standard:incident' },
            {
                title: 'indicator_assignment',
                value: 'standard:indicator_assignment'
            },
            {
                title: 'indicator_definition',
                value: 'standard:indicator_definition'
            },
            {
                title: 'indicator_performance_period',
                value: 'standard:indicator_performance_period'
            },
            { title: 'indicator_result', value: 'standard:indicator_result' },
            { title: 'individual', value: 'standard:individual' },
            { title: 'insights', value: 'standard:insights' },
            { title: 'instore_locations', value: 'standard:instore_locations' },
            {
                title: 'investment_account',
                value: 'standard:investment_account'
            },
            { title: 'invocable_action', value: 'standard:invocable_action' },
            { title: 'iot_context', value: 'standard:iot_context' },
            {
                title: 'iot_orchestrations',
                value: 'standard:iot_orchestrations'
            },
            { title: 'javascript_button', value: 'standard:javascript_button' },
            { title: 'job_family', value: 'standard:job_family' },
            { title: 'job_position', value: 'standard:job_position' },
            { title: 'job_profile', value: 'standard:job_profile' },
            { title: 'kanban', value: 'standard:kanban' },
            { title: 'key_dates', value: 'standard:key_dates' },
            { title: 'knowledge', value: 'standard:knowledge' },
            { title: 'labels', value: 'standard:labels' },
            { title: 'lead_insights', value: 'standard:lead_insights' },
            { title: 'lead_list', value: 'standard:lead_list' },
            { title: 'lead', value: 'standard:lead' },
            { title: 'learner_program', value: 'standard:learner_program' },
            { title: 'letterhead', value: 'standard:letterhead' },
            {
                title: 'lightning_component',
                value: 'standard:lightning_component'
            },
            { title: 'lightning_usage', value: 'standard:lightning_usage' },
            { title: 'link', value: 'standard:link' },
            { title: 'linked', value: 'standard:linked' },
            { title: 'list_email', value: 'standard:list_email' },
            { title: 'list_fee', value: 'standard:list_fee' },
            { title: 'list_rate', value: 'standard:list_rate' },
            { title: 'live_chat_visitor', value: 'standard:live_chat_visitor' },
            { title: 'live_chat', value: 'standard:live_chat' },
            { title: 'location_permit', value: 'standard:location_permit' },
            { title: 'location', value: 'standard:location' },
            { title: 'log_a_call', value: 'standard:log_a_call' },
            { title: 'logging', value: 'standard:logging' },
            { title: 'loop', value: 'standard:loop' },
            { title: 'macros', value: 'standard:macros' },
            { title: 'maintenance_asset', value: 'standard:maintenance_asset' },
            { title: 'maintenance_plan', value: 'standard:maintenance_plan' },
            {
                title: 'maintenance_work_rule',
                value: 'standard:maintenance_work_rule'
            },
            { title: 'manual_discounts', value: 'standard:manual_discounts' },
            { title: 'market', value: 'standard:market' },
            { title: 'marketing_actions', value: 'standard:marketing_actions' },
            {
                title: 'med_rec_recommendation',
                value: 'standard:med_rec_recommendation'
            },
            {
                title: 'med_rec_statement_recommendation',
                value: 'standard:med_rec_statement_recommendation'
            },
            {
                title: 'medication_dispense',
                value: 'standard:medication_dispense'
            },
            {
                title: 'medication_ingredient',
                value: 'standard:medication_ingredient'
            },
            {
                title: 'medication_reconciliation',
                value: 'standard:medication_reconciliation'
            },
            {
                title: 'medication_statement',
                value: 'standard:medication_statement'
            },
            { title: 'medication', value: 'standard:medication' },
            { title: 'merge', value: 'standard:merge' },
            {
                title: 'messaging_conversation',
                value: 'standard:messaging_conversation'
            },
            { title: 'messaging_session', value: 'standard:messaging_session' },
            { title: 'messaging_user', value: 'standard:messaging_user' },
            { title: 'metrics', value: 'standard:metrics' },
            { title: 'mulesoft', value: 'standard:mulesoft' },
            { title: 'multi_picklist', value: 'standard:multi_picklist' },
            {
                title: 'multi_select_checkbox',
                value: 'standard:multi_select_checkbox'
            },
            { title: 'network_contract', value: 'standard:network_contract' },
            { title: 'news', value: 'standard:news' },
            { title: 'nft_settings', value: 'standard:nft_settings' },
            { title: 'nft_studio', value: 'standard:nft_studio' },
            { title: 'no_code_model', value: 'standard:no_code_model' },
            { title: 'note', value: 'standard:note' },
            { title: 'number_input', value: 'standard:number_input' },
            {
                title: 'observation_component',
                value: 'standard:observation_component'
            },
            { title: 'omni_supervisor', value: 'standard:omni_supervisor' },
            { title: 'operating_hours', value: 'standard:operating_hours' },
            {
                title: 'opportunity_contact_role',
                value: 'standard:opportunity_contact_role'
            },
            {
                title: 'opportunity_splits',
                value: 'standard:opportunity_splits'
            },
            { title: 'opportunity', value: 'standard:opportunity' },
            { title: 'orchestrator', value: 'standard:orchestrator' },
            { title: 'order_item', value: 'standard:order_item' },
            { title: 'orders', value: 'standard:orders' },
            { title: 'outcome_activity', value: 'standard:outcome_activity' },
            { title: 'outcome', value: 'standard:outcome' },
            { title: 'output', value: 'standard:output' },
            { title: 'panel_detail', value: 'standard:panel_detail' },
            {
                title: 'partner_fund_allocation',
                value: 'standard:partner_fund_allocation'
            },
            {
                title: 'partner_fund_claim',
                value: 'standard:partner_fund_claim'
            },
            {
                title: 'partner_fund_request',
                value: 'standard:partner_fund_request'
            },
            {
                title: 'partner_marketing_budget',
                value: 'standard:partner_marketing_budget'
            },
            { title: 'partners', value: 'standard:partners' },
            { title: 'party_profile', value: 'standard:party_profile' },
            { title: 'password', value: 'standard:password' },
            { title: 'past_chat', value: 'standard:past_chat' },
            { title: 'path_experiment', value: 'standard:path_experiment' },
            {
                title: 'patient_medication_dosage',
                value: 'standard:patient_medication_dosage'
            },
            { title: 'payment_gateway', value: 'standard:payment_gateway' },
            { title: 'people_score', value: 'standard:people_score' },
            { title: 'people', value: 'standard:people' },
            { title: 'performance', value: 'standard:performance' },
            { title: 'person_account', value: 'standard:person_account' },
            { title: 'person_language', value: 'standard:person_language' },
            { title: 'person_name', value: 'standard:person_name' },
            { title: 'photo', value: 'standard:photo' },
            { title: 'picklist_choice', value: 'standard:picklist_choice' },
            { title: 'picklist_type', value: 'standard:picklist_type' },
            { title: 'planogram', value: 'standard:planogram' },
            { title: 'poll', value: 'standard:poll' },
            {
                title: 'portal_roles_and_subordinates',
                value: 'standard:portal_roles_and_subordinates'
            },
            { title: 'portal_roles', value: 'standard:portal_roles' },
            { title: 'portal', value: 'standard:portal' },
            { title: 'post', value: 'standard:post' },
            { title: 'practitioner_role', value: 'standard:practitioner_role' },
            {
                title: 'price_adjustment_matrix',
                value: 'standard:price_adjustment_matrix'
            },
            {
                title: 'price_adjustment_schedule',
                value: 'standard:price_adjustment_schedule'
            },
            {
                title: 'price_adjustment_tier',
                value: 'standard:price_adjustment_tier'
            },
            {
                title: 'price_book_entries',
                value: 'standard:price_book_entries'
            },
            { title: 'price_books', value: 'standard:price_books' },
            { title: 'price_sheet', value: 'standard:price_sheet' },
            { title: 'pricebook', value: 'standard:pricebook' },
            { title: 'pricing_workspace', value: 'standard:pricing_workspace' },
            { title: 'problem', value: 'standard:problem' },
            { title: 'procedure_detail', value: 'standard:procedure_detail' },
            { title: 'procedure', value: 'standard:procedure' },
            { title: 'process_exception', value: 'standard:process_exception' },
            { title: 'process', value: 'standard:process' },
            {
                title: 'product_consumed_state',
                value: 'standard:product_consumed_state'
            },
            { title: 'product_consumed', value: 'standard:product_consumed' },
            {
                title: 'product_item_transaction',
                value: 'standard:product_item_transaction'
            },
            { title: 'product_item', value: 'standard:product_item' },
            {
                title: 'product_quantity_rules',
                value: 'standard:product_quantity_rules'
            },
            {
                title: 'product_request_line_item',
                value: 'standard:product_request_line_item'
            },
            { title: 'product_request', value: 'standard:product_request' },
            { title: 'product_required', value: 'standard:product_required' },
            {
                title: 'product_service_campaign_item',
                value: 'standard:product_service_campaign_item'
            },
            {
                title: 'product_service_campaign',
                value: 'standard:product_service_campaign'
            },
            {
                title: 'product_transfer_state',
                value: 'standard:product_transfer_state'
            },
            { title: 'product_transfer', value: 'standard:product_transfer' },
            {
                title: 'product_warranty_term',
                value: 'standard:product_warranty_term'
            },
            { title: 'product_workspace', value: 'standard:product_workspace' },
            { title: 'product', value: 'standard:product' },
            { title: 'products', value: 'standard:products' },
            {
                title: 'program_cohort_member',
                value: 'standard:program_cohort_member'
            },
            { title: 'program_cohort', value: 'standard:program_cohort' },
            {
                title: 'promotion_segments',
                value: 'standard:promotion_segments'
            },
            { title: 'promotion_tiers', value: 'standard:promotion_tiers' },
            {
                title: 'promotions_workspace',
                value: 'standard:promotions_workspace'
            },
            { title: 'promotions', value: 'standard:promotions' },
            { title: 'prompt_builder', value: 'standard:prompt_builder' },
            { title: 'prompt', value: 'standard:prompt' },
            {
                title: 'propagation_policy',
                value: 'standard:propagation_policy'
            },
            { title: 'proposition', value: 'standard:proposition' },
            { title: 'qualifications', value: 'standard:qualifications' },
            { title: 'question_best', value: 'standard:question_best' },
            { title: 'question_feed', value: 'standard:question_feed' },
            { title: 'queue', value: 'standard:queue' },
            { title: 'quick_text', value: 'standard:quick_text' },
            { title: 'quip_sheet', value: 'standard:quip_sheet' },
            { title: 'quip', value: 'standard:quip' },
            { title: 'quotes', value: 'standard:quotes' },
            { title: 'radio_button', value: 'standard:radio_button' },
            { title: 'rate_adjustment', value: 'standard:rate_adjustment' },
            { title: 'read_receipts', value: 'standard:read_receipts' },
            { title: 'real_time', value: 'standard:real_time' },
            { title: 'recent', value: 'standard:recent' },
            { title: 'recipe', value: 'standard:recipe' },
            { title: 'record_consent', value: 'standard:record_consent' },
            { title: 'record_create', value: 'standard:record_create' },
            { title: 'record_delete', value: 'standard:record_delete' },
            { title: 'record_lookup', value: 'standard:record_lookup' },
            {
                title: 'record_signature_task',
                value: 'standard:record_signature_task'
            },
            { title: 'record_update', value: 'standard:record_update' },
            { title: 'record', value: 'standard:record' },
            { title: 'recycle_bin', value: 'standard:recycle_bin' },
            { title: 'registered_model', value: 'standard:registered_model' },
            { title: 'related_list', value: 'standard:related_list' },
            { title: 'relationship', value: 'standard:relationship' },
            { title: 'repeaters', value: 'standard:repeaters' },
            { title: 'reply_text', value: 'standard:reply_text' },
            { title: 'report_type', value: 'standard:report_type' },
            { title: 'report', value: 'standard:report' },
            { title: 'resource_absence', value: 'standard:resource_absence' },
            { title: 'resource_capacity', value: 'standard:resource_capacity' },
            {
                title: 'resource_preference',
                value: 'standard:resource_preference'
            },
            { title: 'resource_skill', value: 'standard:resource_skill' },
            {
                title: 'restriction_policy',
                value: 'standard:restriction_policy'
            },
            {
                title: 'return_order_line_item',
                value: 'standard:return_order_line_item'
            },
            { title: 'return_order', value: 'standard:return_order' },
            { title: 'reward', value: 'standard:reward' },
            { title: 'rtc_presence', value: 'standard:rtc_presence' },
            {
                title: 'sales_cadence_target',
                value: 'standard:sales_cadence_target'
            },
            { title: 'sales_cadence', value: 'standard:sales_cadence' },
            { title: 'sales_channel', value: 'standard:sales_channel' },
            { title: 'sales_path', value: 'standard:sales_path' },
            { title: 'sales_value', value: 'standard:sales_value' },
            { title: 'salesforce_cms', value: 'standard:salesforce_cms' },
            { title: 'scan_card', value: 'standard:scan_card' },
            {
                title: 'schedule_objective',
                value: 'standard:schedule_objective'
            },
            {
                title: 'scheduling_constraint',
                value: 'standard:scheduling_constraint'
            },
            { title: 'scheduling_policy', value: 'standard:scheduling_policy' },
            {
                title: 'scheduling_workspace_territory',
                value: 'standard:scheduling_workspace_territory'
            },
            {
                title: 'scheduling_workspace',
                value: 'standard:scheduling_workspace'
            },
            { title: 'screen', value: 'standard:screen' },
            { title: 'search', value: 'standard:search' },
            { title: 'section', value: 'standard:section' },
            { title: 'segments', value: 'standard:segments' },
            { title: 'selling_model', value: 'standard:selling_model' },
            {
                title: 'serialized_product_transaction',
                value: 'standard:serialized_product_transaction'
            },
            {
                title: 'serialized_product',
                value: 'standard:serialized_product'
            },
            {
                title: 'service_appointment_capacity_usage',
                value: 'standard:service_appointment_capacity_usage'
            },
            {
                title: 'service_appointment',
                value: 'standard:service_appointment'
            },
            { title: 'service_contract', value: 'standard:service_contract' },
            {
                title: 'service_crew_member',
                value: 'standard:service_crew_member'
            },
            { title: 'service_crew', value: 'standard:service_crew' },
            { title: 'service_report', value: 'standard:service_report' },
            {
                title: 'service_request_detail',
                value: 'standard:service_request_detail'
            },
            { title: 'service_request', value: 'standard:service_request' },
            { title: 'service_resource', value: 'standard:service_resource' },
            {
                title: 'service_territory_location',
                value: 'standard:service_territory_location'
            },
            {
                title: 'service_territory_member',
                value: 'standard:service_territory_member'
            },
            {
                title: 'service_territory_policy',
                value: 'standard:service_territory_policy'
            },
            { title: 'service_territory', value: 'standard:service_territory' },
            { title: 'settings', value: 'standard:settings' },
            { title: 'setup_modal', value: 'standard:setup_modal' },
            {
                title: 'shift_pattern_entry',
                value: 'standard:shift_pattern_entry'
            },
            { title: 'shift_pattern', value: 'standard:shift_pattern' },
            { title: 'shift_preference', value: 'standard:shift_preference' },
            {
                title: 'shift_scheduling_operation',
                value: 'standard:shift_scheduling_operation'
            },
            { title: 'shift_template', value: 'standard:shift_template' },
            { title: 'shift_type', value: 'standard:shift_type' },
            { title: 'shift', value: 'standard:shift' },
            { title: 'shipment', value: 'standard:shipment' },
            { title: 'skill_entity', value: 'standard:skill_entity' },
            { title: 'skill_requirement', value: 'standard:skill_requirement' },
            { title: 'skill', value: 'standard:skill' },
            {
                title: 'slack_conversations',
                value: 'standard:slack_conversations'
            },
            { title: 'slack', value: 'standard:slack' },
            { title: 'slider', value: 'standard:slider' },
            { title: 'sms', value: 'standard:sms' },
            { title: 'snippet_alt', value: 'standard:snippet_alt' },
            { title: 'snippet', value: 'standard:snippet' },
            { title: 'snippets', value: 'standard:snippets' },
            {
                title: 'sobject_collection',
                value: 'standard:sobject_collection'
            },
            { title: 'sobject', value: 'standard:sobject' },
            { title: 'social', value: 'standard:social' },
            { title: 'solution', value: 'standard:solution' },
            { title: 'sort_policy', value: 'standard:sort_policy' },
            { title: 'sort', value: 'standard:sort' },
            { title: 'sossession', value: 'standard:sossession' },
            { title: 'stage_collection', value: 'standard:stage_collection' },
            { title: 'stage', value: 'standard:stage' },
            { title: 'steps', value: 'standard:steps' },
            { title: 'store_group', value: 'standard:store_group' },
            { title: 'store', value: 'standard:store' },
            { title: 'story', value: 'standard:story' },
            { title: 'strategy', value: 'standard:strategy' },
            { title: 'survey', value: 'standard:survey' },
            { title: 'swarm_request', value: 'standard:swarm_request' },
            { title: 'swarm_session', value: 'standard:swarm_session' },
            {
                title: 'system_and_global_variable',
                value: 'standard:system_and_global_variable'
            },
            { title: 'tableau', value: 'standard:tableau' },
            { title: 'task', value: 'standard:task' },
            { title: 'task2', value: 'standard:task2' },
            { title: 'tax_policy', value: 'standard:tax_policy' },
            { title: 'tax_rate', value: 'standard:tax_rate' },
            { title: 'tax_treatment', value: 'standard:tax_treatment' },
            { title: 'team_member', value: 'standard:team_member' },
            { title: 'template', value: 'standard:template' },
            { title: 'text_template', value: 'standard:text_template' },
            { title: 'text', value: 'standard:text' },
            { title: 'textarea', value: 'standard:textarea' },
            { title: 'textbox', value: 'standard:textbox' },
            { title: 'thanks_loading', value: 'standard:thanks_loading' },
            { title: 'thanks', value: 'standard:thanks' },
            { title: 'time_period', value: 'standard:time_period' },
            { title: 'timesheet_entry', value: 'standard:timesheet_entry' },
            { title: 'timesheet', value: 'standard:timesheet' },
            { title: 'timeslot', value: 'standard:timeslot' },
            { title: 'title_party', value: 'standard:title_party' },
            { title: 'today', value: 'standard:today' },
            { title: 'toggle', value: 'standard:toggle' },
            { title: 'topic', value: 'standard:topic' },
            { title: 'topic2', value: 'standard:topic2' },
            { title: 'tour_check', value: 'standard:tour_check' },
            { title: 'tour', value: 'standard:tour' },
            { title: 'trailhead_alt', value: 'standard:trailhead_alt' },
            { title: 'trailhead', value: 'standard:trailhead' },
            { title: 'travel_mode', value: 'standard:travel_mode' },
            {
                title: 'unified_health_score',
                value: 'standard:unified_health_score'
            },
            { title: 'unmatched', value: 'standard:unmatched' },
            { title: 'uploaded_model', value: 'standard:uploaded_model' },
            { title: 'user_role', value: 'standard:user_role' },
            { title: 'user', value: 'standard:user' },
            { title: 'variable', value: 'standard:variable' },
            {
                title: 'variation_attribute_setup',
                value: 'standard:variation_attribute_setup'
            },
            {
                title: 'variation_products',
                value: 'standard:variation_products'
            },
            { title: 'video', value: 'standard:video' },
            { title: 'visit_templates', value: 'standard:visit_templates' },
            { title: 'visits', value: 'standard:visits' },
            { title: 'visualforce_page', value: 'standard:visualforce_page' },
            { title: 'voice_call', value: 'standard:voice_call' },
            { title: 'volume_discounts', value: 'standard:volume_discounts' },
            { title: 'waits', value: 'standard:waits' },
            { title: 'walkthroughs', value: 'standard:walkthroughs' },
            { title: 'warranty_term', value: 'standard:warranty_term' },
            { title: 'water', value: 'standard:water' },
            { title: 'webcart', value: 'standard:webcart' },
            { title: 'whatsapp', value: 'standard:whatsapp' },
            {
                title: 'work_capacity_limit',
                value: 'standard:work_capacity_limit'
            },
            {
                title: 'work_capacity_usage',
                value: 'standard:work_capacity_usage'
            },
            { title: 'work_contract', value: 'standard:work_contract' },
            { title: 'work_forecast', value: 'standard:work_forecast' },
            { title: 'work_order_item', value: 'standard:work_order_item' },
            { title: 'work_order', value: 'standard:work_order' },
            { title: 'work_plan_rule', value: 'standard:work_plan_rule' },
            {
                title: 'work_plan_template_entry',
                value: 'standard:work_plan_template_entry'
            },
            {
                title: 'work_plan_template',
                value: 'standard:work_plan_template'
            },
            { title: 'work_plan', value: 'standard:work_plan' },
            { title: 'work_queue', value: 'standard:work_queue' },
            {
                title: 'work_step_template',
                value: 'standard:work_step_template'
            },
            { title: 'work_step', value: 'standard:work_step' },
            { title: 'work_summary', value: 'standard:work_summary' },
            { title: 'work_type_group', value: 'standard:work_type_group' },
            { title: 'work_type', value: 'standard:work_type' },
            {
                title: 'workforce_engagement',
                value: 'standard:workforce_engagement'
            },
            { title: 'your_account', value: 'standard:your_account' }
        ]
    },
    {
        title: 'Custom',
        value: 'custom',
        icons: [
            { title: 'custom1', value: 'custom:custom1' },
            { title: 'custom2', value: 'custom:custom2' },
            { title: 'custom3', value: 'custom:custom3' },
            { title: 'custom4', value: 'custom:custom4' },
            { title: 'custom5', value: 'custom:custom5' },
            { title: 'custom6', value: 'custom:custom6' },
            { title: 'custom7', value: 'custom:custom7' },
            { title: 'custom8', value: 'custom:custom8' },
            { title: 'custom9', value: 'custom:custom9' },
            { title: 'custom10', value: 'custom:custom10' },
            { title: 'custom11', value: 'custom:custom11' },
            { title: 'custom12', value: 'custom:custom12' },
            { title: 'custom13', value: 'custom:custom13' },
            { title: 'custom14', value: 'custom:custom14' },
            { title: 'custom15', value: 'custom:custom15' },
            { title: 'custom16', value: 'custom:custom16' },
            { title: 'custom17', value: 'custom:custom17' },
            { title: 'custom18', value: 'custom:custom18' },
            { title: 'custom19', value: 'custom:custom19' },
            { title: 'custom20', value: 'custom:custom20' },
            { title: 'custom21', value: 'custom:custom21' },
            { title: 'custom22', value: 'custom:custom22' },
            { title: 'custom23', value: 'custom:custom23' },
            { title: 'custom24', value: 'custom:custom24' },
            { title: 'custom25', value: 'custom:custom25' },
            { title: 'custom26', value: 'custom:custom26' },
            { title: 'custom27', value: 'custom:custom27' },
            { title: 'custom28', value: 'custom:custom28' },
            { title: 'custom29', value: 'custom:custom29' },
            { title: 'custom30', value: 'custom:custom30' },
            { title: 'custom31', value: 'custom:custom31' },
            { title: 'custom32', value: 'custom:custom32' },
            { title: 'custom33', value: 'custom:custom33' },
            { title: 'custom34', value: 'custom:custom34' },
            { title: 'custom35', value: 'custom:custom35' },
            { title: 'custom36', value: 'custom:custom36' },
            { title: 'custom37', value: 'custom:custom37' },
            { title: 'custom38', value: 'custom:custom38' },
            { title: 'custom39', value: 'custom:custom39' },
            { title: 'custom40', value: 'custom:custom40' },
            { title: 'custom41', value: 'custom:custom41' },
            { title: 'custom42', value: 'custom:custom42' },
            { title: 'custom43', value: 'custom:custom43' },
            { title: 'custom44', value: 'custom:custom44' },
            { title: 'custom45', value: 'custom:custom45' },
            { title: 'custom46', value: 'custom:custom46' },
            { title: 'custom47', value: 'custom:custom47' },
            { title: 'custom48', value: 'custom:custom48' },
            { title: 'custom49', value: 'custom:custom49' },
            { title: 'custom50', value: 'custom:custom50' },
            { title: 'custom51', value: 'custom:custom51' },
            { title: 'custom52', value: 'custom:custom52' },
            { title: 'custom53', value: 'custom:custom53' },
            { title: 'custom54', value: 'custom:custom54' },
            { title: 'custom55', value: 'custom:custom55' },
            { title: 'custom56', value: 'custom:custom56' },
            { title: 'custom57', value: 'custom:custom57' },
            { title: 'custom58', value: 'custom:custom58' },
            { title: 'custom59', value: 'custom:custom59' },
            { title: 'custom60', value: 'custom:custom60' },
            { title: 'custom61', value: 'custom:custom61' },
            { title: 'custom62', value: 'custom:custom62' },
            { title: 'custom63', value: 'custom:custom63' },
            { title: 'custom64', value: 'custom:custom64' },
            { title: 'custom65', value: 'custom:custom65' },
            { title: 'custom66', value: 'custom:custom66' },
            { title: 'custom67', value: 'custom:custom67' },
            { title: 'custom68', value: 'custom:custom68' },
            { title: 'custom69', value: 'custom:custom69' },
            { title: 'custom70', value: 'custom:custom70' },
            { title: 'custom71', value: 'custom:custom71' },
            { title: 'custom72', value: 'custom:custom72' },
            { title: 'custom73', value: 'custom:custom73' },
            { title: 'custom74', value: 'custom:custom74' },
            { title: 'custom75', value: 'custom:custom75' },
            { title: 'custom76', value: 'custom:custom76' },
            { title: 'custom77', value: 'custom:custom77' },
            { title: 'custom78', value: 'custom:custom78' },
            { title: 'custom79', value: 'custom:custom79' },
            { title: 'custom80', value: 'custom:custom80' },
            { title: 'custom81', value: 'custom:custom81' },
            { title: 'custom82', value: 'custom:custom82' },
            { title: 'custom83', value: 'custom:custom83' },
            { title: 'custom84', value: 'custom:custom84' },
            { title: 'custom85', value: 'custom:custom85' },
            { title: 'custom86', value: 'custom:custom86' },
            { title: 'custom87', value: 'custom:custom87' },
            { title: 'custom88', value: 'custom:custom88' },
            { title: 'custom89', value: 'custom:custom89' },
            { title: 'custom90', value: 'custom:custom90' },
            { title: 'custom91', value: 'custom:custom91' },
            { title: 'custom92', value: 'custom:custom92' },
            { title: 'custom93', value: 'custom:custom93' },
            { title: 'custom94', value: 'custom:custom94' },
            { title: 'custom95', value: 'custom:custom95' },
            { title: 'custom96', value: 'custom:custom96' },
            { title: 'custom97', value: 'custom:custom97' },
            { title: 'custom98', value: 'custom:custom98' },
            { title: 'custom99', value: 'custom:custom99' },
            { title: 'custom100', value: 'custom:custom100' },
            { title: 'custom101', value: 'custom:custom101' },
            { title: 'custom102', value: 'custom:custom102' },
            { title: 'custom103', value: 'custom:custom103' },
            { title: 'custom104', value: 'custom:custom104' },
            { title: 'custom105', value: 'custom:custom105' },
            { title: 'custom106', value: 'custom:custom106' },
            { title: 'custom107', value: 'custom:custom107' },
            { title: 'custom108', value: 'custom:custom108' },
            { title: 'custom109', value: 'custom:custom109' },
            { title: 'custom110', value: 'custom:custom110' },
            { title: 'custom111', value: 'custom:custom111' },
            { title: 'custom112', value: 'custom:custom112' },
            { title: 'custom113', value: 'custom:custom113' }
        ]
    },
    {
        title: 'Utility',
        value: 'utility',
        icons: [
            { title: 'activity', value: 'utility:activity' },
            { title: 'ad_set', value: 'utility:ad_set' },
            { title: 'add_above', value: 'utility:add_above' },
            { title: 'add_below', value: 'utility:add_below' },
            { title: 'add_source', value: 'utility:add_source' },
            { title: 'add', value: 'utility:add' },
            { title: 'adduser', value: 'utility:adduser' },
            { title: 'adjust_value', value: 'utility:adjust_value' },
            { title: 'advanced_function', value: 'utility:advanced_function' },
            { title: 'advertising', value: 'utility:advertising' },
            { title: 'agent_home', value: 'utility:agent_home' },
            { title: 'agent_session', value: 'utility:agent_session' },
            { title: 'aggregate', value: 'utility:aggregate' },
            {
                title: 'aggregation_policy',
                value: 'utility:aggregation_policy'
            },
            { title: 'alert', value: 'utility:alert' },
            { title: 'all', value: 'utility:all' },
            { title: 'anchor', value: 'utility:anchor' },
            { title: 'animal_and_nature', value: 'utility:animal_and_nature' },
            { title: 'announcement', value: 'utility:announcement' },
            { title: 'answer', value: 'utility:answer' },
            { title: 'answered_twice', value: 'utility:answered_twice' },
            { title: 'anywhere_alert', value: 'utility:anywhere_alert' },
            { title: 'anywhere_chat', value: 'utility:anywhere_chat' },
            { title: 'apex_alt', value: 'utility:apex_alt' },
            { title: 'apex_plugin', value: 'utility:apex_plugin' },
            { title: 'apex', value: 'utility:apex' },
            { title: 'app_web_messaging', value: 'utility:app_web_messaging' },
            { title: 'approval', value: 'utility:approval' },
            { title: 'apps', value: 'utility:apps' },
            { title: 'archive', value: 'utility:archive' },
            { title: 'array', value: 'utility:array' },
            { title: 'arrow_bottom', value: 'utility:arrow_bottom' },
            { title: 'arrow_left', value: 'utility:arrow_left' },
            { title: 'arrow_right', value: 'utility:arrow_right' },
            { title: 'arrow_top', value: 'utility:arrow_top' },
            { title: 'arrowdown', value: 'utility:arrowdown' },
            { title: 'arrowup', value: 'utility:arrowup' },
            { title: 'asset_audit', value: 'utility:asset_audit' },
            { title: 'asset_object', value: 'utility:asset_object' },
            { title: 'asset_repossessed', value: 'utility:asset_repossessed' },
            { title: 'asset_warranty', value: 'utility:asset_warranty' },
            { title: 'assignment', value: 'utility:assignment' },
            { title: 'attach', value: 'utility:attach' },
            { title: 'automate', value: 'utility:automate' },
            { title: 'away', value: 'utility:away' },
            { title: 'back', value: 'utility:back' },
            { title: 'ban', value: 'utility:ban' },
            { title: 'block_visitor', value: 'utility:block_visitor' },
            { title: 'bold', value: 'utility:bold' },
            { title: 'bookmark_alt', value: 'utility:bookmark_alt' },
            { title: 'bookmark_stroke', value: 'utility:bookmark_stroke' },
            { title: 'bookmark', value: 'utility:bookmark' },
            { title: 'bottom_align', value: 'utility:bottom_align' },
            {
                title: 'bottom_group_alignment',
                value: 'utility:bottom_group_alignment'
            },
            { title: 'breadcrumbs', value: 'utility:breadcrumbs' },
            { title: 'broadcast', value: 'utility:broadcast' },
            { title: 'brush', value: 'utility:brush' },
            { title: 'bucket', value: 'utility:bucket' },
            {
                title: 'budget_category_value',
                value: 'utility:budget_category_value'
            },
            { title: 'budget_period', value: 'utility:budget_period' },
            { title: 'bug', value: 'utility:bug' },
            { title: 'builder', value: 'utility:builder' },
            { title: 'bundle_config', value: 'utility:bundle_config' },
            { title: 'bundle_policy', value: 'utility:bundle_policy' },
            { title: 'button_choice', value: 'utility:button_choice' },
            {
                title: 'buyer_group_qualifier',
                value: 'utility:buyer_group_qualifier'
            },
            {
                title: 'calculated_insights',
                value: 'utility:calculated_insights'
            },
            { title: 'call', value: 'utility:call' },
            { title: 'campaign', value: 'utility:campaign' },
            {
                title: 'cancel_file_request',
                value: 'utility:cancel_file_request'
            },
            { title: 'cancel_transfer', value: 'utility:cancel_transfer' },
            { title: 'cant_sync', value: 'utility:cant_sync' },
            { title: 'capacity_plan', value: 'utility:capacity_plan' },
            { title: 'capslock', value: 'utility:capslock' },
            { title: 'captions', value: 'utility:captions' },
            { title: 'cart', value: 'utility:cart' },
            { title: 'case', value: 'utility:case' },
            { title: 'cases', value: 'utility:cases' }
        ],
        iconsExtended: [
            { title: 'center_align_text', value: 'utility:center_align_text' },
            { title: 'center_align', value: 'utility:center_align' },
            {
                title: 'center_group_alignment',
                value: 'utility:center_group_alignment'
            },
            { title: 'change_owner', value: 'utility:change_owner' },
            {
                title: 'change_record_type',
                value: 'utility:change_record_type'
            },
            { title: 'change_request', value: 'utility:change_request' },
            { title: 'chart', value: 'utility:chart' },
            { title: 'chat', value: 'utility:chat' },
            { title: 'check', value: 'utility:check' },
            { title: 'checkin', value: 'utility:checkin' },
            { title: 'checkout', value: 'utility:checkout' },
            { title: 'chevrondown', value: 'utility:chevrondown' },
            { title: 'chevronleft', value: 'utility:chevronleft' },
            { title: 'chevronright', value: 'utility:chevronright' },
            { title: 'chevronup', value: 'utility:chevronup' },
            { title: 'choice', value: 'utility:choice' },
            { title: 'classic_interface', value: 'utility:classic_interface' },
            { title: 'clear', value: 'utility:clear' },
            { title: 'clock', value: 'utility:clock' },
            { title: 'close', value: 'utility:close' },
            { title: 'collapse_all', value: 'utility:collapse_all' },
            { title: 'collection_alt', value: 'utility:collection_alt' },
            {
                title: 'collection_variable',
                value: 'utility:collection_variable'
            },
            { title: 'collection', value: 'utility:collection' },
            { title: 'color_swatch', value: 'utility:color_swatch' },
            { title: 'columns', value: 'utility:columns' },
            { title: 'comments', value: 'utility:comments' },
            { title: 'company', value: 'utility:company' },
            {
                title: 'component_customization',
                value: 'utility:component_customization'
            },
            { title: 'connected_apps', value: 'utility:connected_apps' },
            { title: 'constant', value: 'utility:constant' },
            { title: 'contact_request', value: 'utility:contact_request' },
            { title: 'contact', value: 'utility:contact' },
            { title: 'contract_alt', value: 'utility:contract_alt' },
            { title: 'contract_doc', value: 'utility:contract_doc' },
            {
                title: 'contract_line_outcome_data',
                value: 'utility:contract_line_outcome_data'
            },
            {
                title: 'contract_line_outcome',
                value: 'utility:contract_line_outcome'
            },
            { title: 'contract_payment', value: 'utility:contract_payment' },
            { title: 'contract', value: 'utility:contract' },
            { title: 'copy_to_clipboard', value: 'utility:copy_to_clipboard' },
            { title: 'copy', value: 'utility:copy' },
            { title: 'coupon_codes', value: 'utility:coupon_codes' },
            { title: 'crossfilter', value: 'utility:crossfilter' },
            { title: 'currency_input', value: 'utility:currency_input' },
            { title: 'currency', value: 'utility:currency' },
            { title: 'custom_apps', value: 'utility:custom_apps' },
            {
                title: 'customer_workspace',
                value: 'utility:customer_workspace'
            },
            { title: 'customer', value: 'utility:customer' },
            { title: 'cut', value: 'utility:cut' },
            { title: 'dash', value: 'utility:dash' },
            { title: 'data_cloud', value: 'utility:data_cloud' },
            { title: 'data_graph', value: 'utility:data_graph' },
            { title: 'data_mapping', value: 'utility:data_mapping' },
            { title: 'data_model', value: 'utility:data_model' },
            { title: 'data_transforms', value: 'utility:data_transforms' },
            { title: 'database', value: 'utility:database' },
            { title: 'datadotcom', value: 'utility:datadotcom' },
            { title: 'date_input', value: 'utility:date_input' },
            { title: 'date_time', value: 'utility:date_time' },
            { title: 'dayview', value: 'utility:dayview' },
            { title: 'delete', value: 'utility:delete' },
            { title: 'deprecate', value: 'utility:deprecate' },
            { title: 'description', value: 'utility:description' },
            { title: 'desktop_and_phone', value: 'utility:desktop_and_phone' },
            { title: 'desktop_console', value: 'utility:desktop_console' },
            { title: 'desktop', value: 'utility:desktop' },
            { title: 'detach', value: 'utility:detach' },
            { title: 'dialing', value: 'utility:dialing' },
            { title: 'diamond', value: 'utility:diamond' },
            { title: 'discounts', value: 'utility:discounts' },
            { title: 'dislike', value: 'utility:dislike' },
            { title: 'display_rich_text', value: 'utility:display_rich_text' },
            { title: 'display_text', value: 'utility:display_text' },
            { title: 'dock_panel', value: 'utility:dock_panel' },
            { title: 'document_preview', value: 'utility:document_preview' },
            { title: 'down', value: 'utility:down' },
            { title: 'download', value: 'utility:download' },
            { title: 'drag_and_drop', value: 'utility:drag_and_drop' },
            { title: 'drag', value: 'utility:drag' },
            {
                title: 'duration_downscale',
                value: 'utility:duration_downscale'
            },
            {
                title: 'dynamic_record_choice',
                value: 'utility:dynamic_record_choice'
            },
            { title: 'edit_form', value: 'utility:edit_form' },
            { title: 'edit_gpt', value: 'utility:edit_gpt' },
            { title: 'edit', value: 'utility:edit' },
            { title: 'education', value: 'utility:education' },
            { title: 'einstein_alt', value: 'utility:einstein_alt' },
            { title: 'einstein', value: 'utility:einstein' },
            { title: 'email_open', value: 'utility:email_open' },
            { title: 'email', value: 'utility:email' },
            { title: 'emoji', value: 'utility:emoji' },
            { title: 'end_call', value: 'utility:end_call' },
            { title: 'end_chat', value: 'utility:end_chat' },
            {
                title: 'end_messaging_session',
                value: 'utility:end_messaging_session'
            },
            { title: 'engage', value: 'utility:engage' },
            { title: 'enter', value: 'utility:enter' },
            { title: 'entitlement', value: 'utility:entitlement' },
            { title: 'erect_window', value: 'utility:erect_window' },
            { title: 'error', value: 'utility:error' },
            { title: 'event_ext', value: 'utility:event_ext' },
            { title: 'event', value: 'utility:event' },
            { title: 'events', value: 'utility:events' },
            { title: 'expand_all', value: 'utility:expand_all' },
            { title: 'expand_alt', value: 'utility:expand_alt' },
            { title: 'expand', value: 'utility:expand' },
            { title: 'expired', value: 'utility:expired' },
            { title: 'fallback', value: 'utility:fallback' },
            { title: 'favorite_alt', value: 'utility:favorite_alt' },
            { title: 'favorite', value: 'utility:favorite' },
            { title: 'feed', value: 'utility:feed' },
            { title: 'field_sales', value: 'utility:field_sales' },
            { title: 'file', value: 'utility:file' },
            {
                title: 'filter_criteria_rule',
                value: 'utility:filter_criteria_rule'
            },
            { title: 'filter_criteria', value: 'utility:filter_criteria' },
            { title: 'filter', value: 'utility:filter' },
            { title: 'filterList', value: 'utility:filterList' },
            { title: 'flow_alt', value: 'utility:flow_alt' },
            { title: 'flow', value: 'utility:flow' },
            { title: 'food_and_drink', value: 'utility:food_and_drink' },
            { title: 'form', value: 'utility:form' },
            { title: 'formula', value: 'utility:formula' },
            { title: 'forward_up', value: 'utility:forward_up' },
            { title: 'forward', value: 'utility:forward' },
            { title: 'freeze_column', value: 'utility:freeze_column' },
            { title: 'frozen', value: 'utility:frozen' },
            { title: 'fulfillment_order', value: 'utility:fulfillment_order' },
            { title: 'full_width_view', value: 'utility:full_width_view' },
            { title: 'fully_synced', value: 'utility:fully_synced' },
            {
                title: 'funding_award_adjustment',
                value: 'utility:funding_award_adjustment'
            },
            {
                title: 'funding_requirement',
                value: 'utility:funding_requirement'
            },
            { title: 'global_constant', value: 'utility:global_constant' },
            { title: 'graph', value: 'utility:graph' },
            { title: 'groups', value: 'utility:groups' },
            { title: 'guidance', value: 'utility:guidance' },
            { title: 'hazmat_equipment', value: 'utility:hazmat_equipment' },
            { title: 'heart', value: 'utility:heart' },
            { title: 'help_center', value: 'utility:help_center' },
            { title: 'help_doc_ext', value: 'utility:help_doc_ext' },
            { title: 'help', value: 'utility:help' },
            { title: 'hide_mobile', value: 'utility:hide_mobile' },
            { title: 'hide', value: 'utility:hide' },
            { title: 'hierarchy', value: 'utility:hierarchy' },
            {
                title: 'high_velocity_sales',
                value: 'utility:high_velocity_sales'
            },
            {
                title: 'holiday_operating_hours',
                value: 'utility:holiday_operating_hours'
            },
            { title: 'home', value: 'utility:home' },
            { title: 'hourglass', value: 'utility:hourglass' },
            { title: 'http', value: 'utility:http' },
            { title: 'identity', value: 'utility:identity' },
            { title: 'image', value: 'utility:image' },
            { title: 'in_app_assistant', value: 'utility:in_app_assistant' },
            { title: 'inbox', value: 'utility:inbox' },
            { title: 'incident', value: 'utility:incident' },
            { title: 'incoming_call', value: 'utility:incoming_call' },
            {
                title: 'indicator_performance_period',
                value: 'utility:indicator_performance_period'
            },
            { title: 'info_alt', value: 'utility:info_alt' },
            { title: 'info', value: 'utility:info' },
            { title: 'inner_join', value: 'utility:inner_join' },
            { title: 'insert_tag_field', value: 'utility:insert_tag_field' },
            { title: 'insert_template', value: 'utility:insert_template' },
            { title: 'inspector_panel', value: 'utility:inspector_panel' },
            { title: 'integration', value: 'utility:integration' },
            { title: 'internal_share', value: 'utility:internal_share' },
            { title: 'italic', value: 'utility:italic' },
            { title: 'join', value: 'utility:join' },
            { title: 'jump_to_bottom', value: 'utility:jump_to_bottom' },
            { title: 'jump_to_left', value: 'utility:jump_to_left' },
            { title: 'jump_to_right', value: 'utility:jump_to_right' },
            { title: 'jump_to_top', value: 'utility:jump_to_top' },
            { title: 'justify_text', value: 'utility:justify_text' },
            { title: 'kanban', value: 'utility:kanban' },
            { title: 'key_dates', value: 'utility:key_dates' },
            { title: 'key', value: 'utility:key' },
            { title: 'keyboard_dismiss', value: 'utility:keyboard_dismiss' },
            { title: 'keypad', value: 'utility:keypad' },
            { title: 'knowledge_base', value: 'utility:knowledge_base' },
            {
                title: 'knowledge_smart_link',
                value: 'utility:knowledge_smart_link'
            },
            { title: 'label', value: 'utility:label' },
            { title: 'labels', value: 'utility:labels' },
            { title: 'layers', value: 'utility:layers' },
            { title: 'layout_banner', value: 'utility:layout_banner' },
            { title: 'layout_card', value: 'utility:layout_card' },
            { title: 'layout_overlap', value: 'utility:layout_overlap' },
            { title: 'layout_tile', value: 'utility:layout_tile' },
            { title: 'layout', value: 'utility:layout' },
            { title: 'lead', value: 'utility:lead' },
            { title: 'leave_conference', value: 'utility:leave_conference' },
            { title: 'left_align_text', value: 'utility:left_align_text' },
            { title: 'left_align', value: 'utility:left_align' },
            { title: 'left_join', value: 'utility:left_join' },
            { title: 'left', value: 'utility:left' },
            { title: 'level_down', value: 'utility:level_down' },
            { title: 'level_up', value: 'utility:level_up' },
            { title: 'light_bulb', value: 'utility:light_bulb' },
            {
                title: 'lightning_extension',
                value: 'utility:lightning_extension'
            },
            {
                title: 'lightning_inspector',
                value: 'utility:lightning_inspector'
            },
            { title: 'like', value: 'utility:like' },
            { title: 'link', value: 'utility:link' },
            { title: 'linked', value: 'utility:linked' },
            { title: 'list', value: 'utility:list' },
            { title: 'listen', value: 'utility:listen' },
            { title: 'live_message', value: 'utility:live_message' },
            { title: 'location_permit', value: 'utility:location_permit' },
            { title: 'location', value: 'utility:location' },
            { title: 'lock', value: 'utility:lock' },
            {
                title: 'locked_with_additions',
                value: 'utility:locked_with_additions'
            },
            {
                title: 'locker_service_api_viewer',
                value: 'utility:locker_service_api_viewer'
            },
            {
                title: 'locker_service_console',
                value: 'utility:locker_service_console'
            },
            { title: 'log_a_call', value: 'utility:log_a_call' },
            { title: 'logout', value: 'utility:logout' },
            { title: 'loop', value: 'utility:loop' },
            { title: 'lower_flag', value: 'utility:lower_flag' },
            { title: 'macros', value: 'utility:macros' },
            { title: 'magicwand', value: 'utility:magicwand' },
            { title: 'maintenance_plan', value: 'utility:maintenance_plan' },
            { title: 'mark_all_as_read', value: 'utility:mark_all_as_read' },
            { title: 'market', value: 'utility:market' },
            { title: 'matrix', value: 'utility:matrix' },
            {
                title: 'meet_content_source',
                value: 'utility:meet_content_source'
            },
            {
                title: 'meet_focus_content',
                value: 'utility:meet_focus_content'
            },
            { title: 'meet_focus_equal', value: 'utility:meet_focus_equal' },
            {
                title: 'meet_focus_presenter',
                value: 'utility:meet_focus_presenter'
            },
            {
                title: 'meet_present_panel',
                value: 'utility:meet_present_panel'
            },
            { title: 'merge_field', value: 'utility:merge_field' },
            { title: 'merge', value: 'utility:merge' },
            { title: 'metrics', value: 'utility:metrics' },
            { title: 'middle_align', value: 'utility:middle_align' },
            { title: 'minimize_window', value: 'utility:minimize_window' },
            { title: 'missed_call', value: 'utility:missed_call' },
            {
                title: 'mixed_sources_mapping',
                value: 'utility:mixed_sources_mapping'
            },
            { title: 'money', value: 'utility:money' },
            { title: 'moneybag', value: 'utility:moneybag' },
            { title: 'monthlyview', value: 'utility:monthlyview' },
            { title: 'more', value: 'utility:more' },
            { title: 'move', value: 'utility:move' },
            { title: 'mulesoft', value: 'utility:mulesoft' },
            { title: 'multi_picklist', value: 'utility:multi_picklist' },
            {
                title: 'multi_select_checkbox',
                value: 'utility:multi_select_checkbox'
            },
            { title: 'muted', value: 'utility:muted' },
            {
                title: 'new_direct_message',
                value: 'utility:new_direct_message'
            },
            { title: 'new_window', value: 'utility:new_window' },
            { title: 'new', value: 'utility:new' },
            { title: 'news', value: 'utility:news' },
            { title: 'no_return', value: 'utility:no_return' },
            { title: 'not_in_sync', value: 'utility:not_in_sync' },
            { title: 'not_saved', value: 'utility:not_saved' },
            { title: 'note', value: 'utility:note' },
            { title: 'notebook', value: 'utility:notebook' },
            { title: 'notification_off', value: 'utility:notification_off' },
            {
                title: 'notification_snoozed',
                value: 'utility:notification_snoozed'
            },
            { title: 'notification', value: 'utility:notification' },
            { title: 'number_input', value: 'utility:number_input' },
            { title: 'office365', value: 'utility:office365' },
            { title: 'offline_briefcase', value: 'utility:offline_briefcase' },
            { title: 'offline_cached', value: 'utility:offline_cached' },
            { title: 'offline', value: 'utility:offline' },
            { title: 'omni_channel', value: 'utility:omni_channel' },
            { title: 'open_folder', value: 'utility:open_folder' },
            { title: 'open', value: 'utility:open' },
            { title: 'opened_folder', value: 'utility:opened_folder' },
            { title: 'opportunity', value: 'utility:opportunity' },
            { title: 'orchestrator', value: 'utility:orchestrator' },
            { title: 'orders', value: 'utility:orders' },
            { title: 'org_chart', value: 'utility:org_chart' },
            { title: 'outbound_call', value: 'utility:outbound_call' },
            { title: 'outcome', value: 'utility:outcome' },
            { title: 'outer_join', value: 'utility:outer_join' },
            { title: 'overflow', value: 'utility:overflow' },
            { title: 'package_org_beta', value: 'utility:package_org_beta' },
            { title: 'package_org', value: 'utility:package_org' },
            { title: 'package', value: 'utility:package' },
            { title: 'page_structure', value: 'utility:page_structure' },
            { title: 'page', value: 'utility:page' },
            { title: 'palette', value: 'utility:palette' },
            { title: 'password', value: 'utility:password' },
            { title: 'paste', value: 'utility:paste' },
            { title: 'path_experiment', value: 'utility:path_experiment' },
            { title: 'pause_alt', value: 'utility:pause_alt' },
            { title: 'pause', value: 'utility:pause' },
            { title: 'payment_deferred', value: 'utility:payment_deferred' },
            { title: 'payment_gateway', value: 'utility:payment_gateway' },
            { title: 'pdf_ext', value: 'utility:pdf_ext' },
            { title: 'people', value: 'utility:people' },
            { title: 'percent', value: 'utility:percent' },
            { title: 'phone_landscape', value: 'utility:phone_landscape' },
            { title: 'phone_portrait', value: 'utility:phone_portrait' },
            { title: 'photo', value: 'utility:photo' },
            { title: 'picklist_choice', value: 'utility:picklist_choice' },
            { title: 'picklist_type', value: 'utility:picklist_type' },
            { title: 'picklist', value: 'utility:picklist' },
            { title: 'pin', value: 'utility:pin' },
            { title: 'pinned', value: 'utility:pinned' },
            { title: 'plane', value: 'utility:plane' },
            { title: 'planning_poker', value: 'utility:planning_poker' },
            { title: 'play', value: 'utility:play' },
            { title: 'podcast_webinar', value: 'utility:podcast_webinar' },
            { title: 'pop_in', value: 'utility:pop_in' },
            { title: 'power', value: 'utility:power' },
            { title: 'preview', value: 'utility:preview' },
            {
                title: 'price_book_entries',
                value: 'utility:price_book_entries'
            },
            { title: 'price_books', value: 'utility:price_books' },
            { title: 'pricing_workspace', value: 'utility:pricing_workspace' },
            { title: 'print', value: 'utility:print' },
            { title: 'priority', value: 'utility:priority' },
            { title: 'privately_shared', value: 'utility:privately_shared' },
            { title: 'problem', value: 'utility:problem' },
            { title: 'process', value: 'utility:process' },
            {
                title: 'product_consumed_state',
                value: 'utility:product_consumed_state'
            },
            {
                title: 'product_quantity_rules',
                value: 'utility:product_quantity_rules'
            },
            {
                title: 'product_service_campaign_item',
                value: 'utility:product_service_campaign_item'
            },
            {
                title: 'product_service_campaign',
                value: 'utility:product_service_campaign'
            },
            {
                title: 'product_transfer_state',
                value: 'utility:product_transfer_state'
            },
            { title: 'product_transfer', value: 'utility:product_transfer' },
            {
                title: 'product_warranty_term',
                value: 'utility:product_warranty_term'
            },
            { title: 'product_workspace', value: 'utility:product_workspace' },
            { title: 'product', value: 'utility:product' },
            { title: 'products', value: 'utility:products' },
            { title: 'profile_alt', value: 'utility:profile_alt' },
            { title: 'profile', value: 'utility:profile' },
            {
                title: 'program_cohort_member',
                value: 'utility:program_cohort_member'
            },
            { title: 'program_cohort', value: 'utility:program_cohort' },
            {
                title: 'promotion_segments',
                value: 'utility:promotion_segments'
            },
            { title: 'promotion_tiers', value: 'utility:promotion_tiers' },
            {
                title: 'promotions_workspace',
                value: 'utility:promotions_workspace'
            },
            { title: 'promotions', value: 'utility:promotions' },
            { title: 'prompt_builder', value: 'utility:prompt_builder' },
            { title: 'prompt_edit', value: 'utility:prompt_edit' },
            { title: 'prompt', value: 'utility:prompt' },
            {
                title: 'propagation_policy',
                value: 'utility:propagation_policy'
            },
            { title: 'proposition', value: 'utility:proposition' },
            { title: 'push', value: 'utility:push' },
            { title: 'puzzle', value: 'utility:puzzle' },
            { title: 'qualifications', value: 'utility:qualifications' },
            { title: 'question_mark', value: 'utility:question_mark' },
            { title: 'question', value: 'utility:question' },
            {
                title: 'questions_and_answers',
                value: 'utility:questions_and_answers'
            },
            { title: 'queue', value: 'utility:queue' },
            { title: 'quick_text', value: 'utility:quick_text' },
            { title: 'quip', value: 'utility:quip' },
            { title: 'quotation_marks', value: 'utility:quotation_marks' },
            { title: 'quote', value: 'utility:quote' },
            { title: 'radio_button', value: 'utility:radio_button' },
            { title: 'rating', value: 'utility:rating' },
            { title: 'real_time', value: 'utility:real_time' },
            { title: 'reassign', value: 'utility:reassign' },
            { title: 'recipe', value: 'utility:recipe' },
            { title: 'record_alt', value: 'utility:record_alt' },
            { title: 'record_collection', value: 'utility:record_collection' },
            { title: 'record_consent', value: 'utility:record_consent' },
            { title: 'record_create', value: 'utility:record_create' },
            { title: 'record_delete', value: 'utility:record_delete' },
            { title: 'record_lookup', value: 'utility:record_lookup' },
            { title: 'record_update', value: 'utility:record_update' },
            { title: 'record', value: 'utility:record' },
            {
                title: 'recurring_exception',
                value: 'utility:recurring_exception'
            },
            { title: 'recycle_bin_empty', value: 'utility:recycle_bin_empty' },
            { title: 'recycle_bin_full', value: 'utility:recycle_bin_full' },
            { title: 'redo', value: 'utility:redo' },
            { title: 'refresh', value: 'utility:refresh' },
            { title: 'relate', value: 'utility:relate' },
            { title: 'reminder', value: 'utility:reminder' },
            { title: 'remove_formatting', value: 'utility:remove_formatting' },
            { title: 'remove_link', value: 'utility:remove_link' },
            { title: 'replace', value: 'utility:replace' },
            { title: 'reply_all', value: 'utility:reply_all' },
            { title: 'reply', value: 'utility:reply' },
            { title: 'report_issue', value: 'utility:report_issue' },
            { title: 'reset_password', value: 'utility:reset_password' },
            { title: 'resource_absence', value: 'utility:resource_absence' },
            { title: 'resource_capacity', value: 'utility:resource_capacity' },
            {
                title: 'resource_territory',
                value: 'utility:resource_territory'
            },
            {
                title: 'restriction_policy',
                value: 'utility:restriction_policy'
            },
            { title: 'retail_execution', value: 'utility:retail_execution' },
            { title: 'retweet', value: 'utility:retweet' },
            { title: 'ribbon', value: 'utility:ribbon' },
            {
                title: 'richtextbulletedlist',
                value: 'utility:richtextbulletedlist'
            },
            { title: 'richtextindent', value: 'utility:richtextindent' },
            {
                title: 'richtextnumberedlist',
                value: 'utility:richtextnumberedlist'
            },
            { title: 'richtextoutdent', value: 'utility:richtextoutdent' },
            { title: 'right_align_text', value: 'utility:right_align_text' },
            { title: 'right_align', value: 'utility:right_align' },
            { title: 'right_join', value: 'utility:right_join' },
            { title: 'right', value: 'utility:right' },
            { title: 'rotate', value: 'utility:rotate' },
            { title: 'routing_offline', value: 'utility:routing_offline' },
            { title: 'rows', value: 'utility:rows' },
            { title: 'rules', value: 'utility:rules' },
            { title: 'salesforce_page', value: 'utility:salesforce_page' },
            { title: 'salesforce1', value: 'utility:salesforce1' },
            { title: 'save', value: 'utility:save' },
            { title: 'scan', value: 'utility:scan' },
            { title: 'screen', value: 'utility:screen' },
            { title: 'search', value: 'utility:search' },
            { title: 'section', value: 'utility:section' },
            { title: 'segments', value: 'utility:segments' },
            { title: 'send_log', value: 'utility:send_log' },
            { title: 'send', value: 'utility:send' },
            { title: 'sender_email', value: 'utility:sender_email' },
            {
                title: 'sentiment_negative',
                value: 'utility:sentiment_negative'
            },
            { title: 'sentiment_neutral', value: 'utility:sentiment_neutral' },
            {
                title: 'serialized_product_transaction',
                value: 'utility:serialized_product_transaction'
            },
            {
                title: 'serialized_product',
                value: 'utility:serialized_product'
            },
            {
                title: 'service_appointment',
                value: 'utility:service_appointment'
            },
            { title: 'service_contract', value: 'utility:service_contract' },
            { title: 'service_report', value: 'utility:service_report' },
            {
                title: 'service_territory_policy',
                value: 'utility:service_territory_policy'
            },
            { title: 'settings', value: 'utility:settings' },
            {
                title: 'setup_assistant_guide',
                value: 'utility:setup_assistant_guide'
            },
            { title: 'setup_modal', value: 'utility:setup_modal' },
            { title: 'setup', value: 'utility:setup' },
            { title: 'share_file', value: 'utility:share_file' },
            { title: 'share_mobile', value: 'utility:share_mobile' },
            { title: 'share_post', value: 'utility:share_post' },
            { title: 'share', value: 'utility:share' },
            { title: 'shield', value: 'utility:shield' },
            {
                title: 'shift_pattern_entry',
                value: 'utility:shift_pattern_entry'
            },
            { title: 'shift_pattern', value: 'utility:shift_pattern' },
            {
                title: 'shift_scheduling_operation',
                value: 'utility:shift_scheduling_operation'
            },
            { title: 'shift_ui', value: 'utility:shift_ui' },
            { title: 'shopping_bag', value: 'utility:shopping_bag' },
            { title: 'shortcuts', value: 'utility:shortcuts' },
            { title: 'side_list', value: 'utility:side_list' },
            { title: 'signature', value: 'utility:signature' },
            { title: 'signpost', value: 'utility:signpost' },
            { title: 'skill', value: 'utility:skill' },
            { title: 'skip_back', value: 'utility:skip_back' },
            { title: 'skip_forward', value: 'utility:skip_forward' },
            { title: 'skip', value: 'utility:skip' },
            {
                title: 'slack_conversations',
                value: 'utility:slack_conversations'
            },
            { title: 'slack', value: 'utility:slack' },
            { title: 'slider', value: 'utility:slider' },
            { title: 'smiley_and_people', value: 'utility:smiley_and_people' },
            { title: 'sms', value: 'utility:sms' },
            { title: 'snippet', value: 'utility:snippet' },
            {
                title: 'sobject_collection',
                value: 'utility:sobject_collection'
            },
            { title: 'sobject', value: 'utility:sobject' },
            { title: 'socialshare', value: 'utility:socialshare' },
            { title: 'sort_policy', value: 'utility:sort_policy' },
            { title: 'sort', value: 'utility:sort' },
            { title: 'spacer', value: 'utility:spacer' },
            { title: 'sparkle', value: 'utility:sparkle' },
            { title: 'sparkles', value: 'utility:sparkles' },
            { title: 'spinner', value: 'utility:spinner' },
            { title: 'stage_collection', value: 'utility:stage_collection' },
            { title: 'stage', value: 'utility:stage' },
            { title: 'standard_objects', value: 'utility:standard_objects' },
            { title: 'steps', value: 'utility:steps' },
            { title: 'stop', value: 'utility:stop' },
            { title: 'store', value: 'utility:store' },
            { title: 'strategy', value: 'utility:strategy' },
            { title: 'strikethrough', value: 'utility:strikethrough' },
            { title: 'success', value: 'utility:success' },
            { title: 'summary', value: 'utility:summary' },
            { title: 'summarydetail', value: 'utility:summarydetail' },
            { title: 'survey', value: 'utility:survey' },
            { title: 'swarm_request', value: 'utility:swarm_request' },
            { title: 'swarm_session', value: 'utility:swarm_session' },
            { title: 'switch', value: 'utility:switch' },
            { title: 'symbols', value: 'utility:symbols' },
            { title: 'sync_in_progress', value: 'utility:sync_in_progress' },
            { title: 'sync', value: 'utility:sync' },
            {
                title: 'system_and_global_variable',
                value: 'utility:system_and_global_variable'
            },
            { title: 'table_settings', value: 'utility:table_settings' },
            { title: 'table', value: 'utility:table' },
            { title: 'tableau', value: 'utility:tableau' },
            { title: 'tablet_landscape', value: 'utility:tablet_landscape' },
            { title: 'tablet_portrait', value: 'utility:tablet_portrait' },
            { title: 'tabset', value: 'utility:tabset' },
            {
                title: 'talent_development',
                value: 'utility:talent_development'
            },
            { title: 'target_mode', value: 'utility:target_mode' },
            { title: 'target', value: 'utility:target' },
            { title: 'task', value: 'utility:task' },
            { title: 'tax_policy', value: 'utility:tax_policy' },
            { title: 'tax_rate', value: 'utility:tax_rate' },
            { title: 'tax_treatment', value: 'utility:tax_treatment' },
            {
                title: 'text_background_color',
                value: 'utility:text_background_color'
            },
            { title: 'text_color', value: 'utility:text_color' },
            { title: 'text_template', value: 'utility:text_template' },
            { title: 'text', value: 'utility:text' },
            { title: 'textarea', value: 'utility:textarea' },
            { title: 'textbox', value: 'utility:textbox' },
            {
                title: 'threedots_vertical',
                value: 'utility:threedots_vertical'
            },
            { title: 'threedots', value: 'utility:threedots' },
            { title: 'thunder', value: 'utility:thunder' },
            { title: 'tile_card_list', value: 'utility:tile_card_list' },
            { title: 'toggle_off', value: 'utility:toggle_off' },
            { title: 'toggle_on', value: 'utility:toggle_on' },
            {
                title: 'toggle_panel_bottom',
                value: 'utility:toggle_panel_bottom'
            },
            { title: 'toggle_panel_left', value: 'utility:toggle_panel_left' },
            {
                title: 'toggle_panel_right',
                value: 'utility:toggle_panel_right'
            },
            { title: 'toggle_panel_top', value: 'utility:toggle_panel_top' },
            { title: 'toggle', value: 'utility:toggle' },
            { title: 'tollways', value: 'utility:tollways' },
            { title: 'top_align', value: 'utility:top_align' },
            {
                title: 'top_group_alignment',
                value: 'utility:top_group_alignment'
            },
            { title: 'topic', value: 'utility:topic' },
            { title: 'topic2', value: 'utility:topic2' },
            { title: 'touch_action', value: 'utility:touch_action' },
            { title: 'tour_check', value: 'utility:tour_check' },
            { title: 'tour', value: 'utility:tour' },
            { title: 'tracker', value: 'utility:tracker' },
            { title: 'trail', value: 'utility:trail' },
            { title: 'trailblazer_ext', value: 'utility:trailblazer_ext' },
            { title: 'trailhead_alt', value: 'utility:trailhead_alt' },
            { title: 'trailhead_ext', value: 'utility:trailhead_ext' },
            { title: 'trailhead', value: 'utility:trailhead' },
            { title: 'transparent', value: 'utility:transparent' },
            { title: 'transport_bicycle', value: 'utility:transport_bicycle' },
            {
                title: 'transport_heavy_truck',
                value: 'utility:transport_heavy_truck'
            },
            {
                title: 'transport_light_truck',
                value: 'utility:transport_light_truck'
            },
            { title: 'transport_walking', value: 'utility:transport_walking' },
            { title: 'travel_and_places', value: 'utility:travel_and_places' },
            { title: 'trending', value: 'utility:trending' },
            { title: 'truck', value: 'utility:truck' },
            {
                title: 'turn_off_notifications',
                value: 'utility:turn_off_notifications'
            },
            { title: 'type_tool', value: 'utility:type_tool' },
            { title: 'type', value: 'utility:type' },
            { title: 'undelete', value: 'utility:undelete' },
            { title: 'undeprecate', value: 'utility:undeprecate' },
            { title: 'underline', value: 'utility:underline' },
            { title: 'undo', value: 'utility:undo' },
            { title: 'unlinked', value: 'utility:unlinked' },
            { title: 'unlock', value: 'utility:unlock' },
            { title: 'unmuted', value: 'utility:unmuted' },
            { title: 'up', value: 'utility:up' },
            { title: 'upload', value: 'utility:upload' },
            { title: 'user_role', value: 'utility:user_role' },
            { title: 'user', value: 'utility:user' },
            { title: 'variable', value: 'utility:variable' },
            {
                title: 'variation_attribute_setup',
                value: 'utility:variation_attribute_setup'
            },
            {
                title: 'variation_products',
                value: 'utility:variation_products'
            },
            { title: 'video_off', value: 'utility:video_off' },
            { title: 'video', value: 'utility:video' },
            {
                title: 'visibility_rule_assigned',
                value: 'utility:visibility_rule_assigned'
            },
            { title: 'voicemail_drop', value: 'utility:voicemail_drop' },
            { title: 'volume_high', value: 'utility:volume_high' },
            { title: 'volume_low', value: 'utility:volume_low' },
            { title: 'volume_off', value: 'utility:volume_off' },
            { title: 'waits', value: 'utility:waits' },
            { title: 'walkthroughs', value: 'utility:walkthroughs' },
            { title: 'warning', value: 'utility:warning' },
            { title: 'warranty_term', value: 'utility:warranty_term' },
            { title: 'watchlist', value: 'utility:watchlist' },
            { title: 'water', value: 'utility:water' },
            { title: 'weeklyview', value: 'utility:weeklyview' },
            { title: 'wellness', value: 'utility:wellness' },
            { title: 'wifi', value: 'utility:wifi' },
            { title: 'work_forecast', value: 'utility:work_forecast' },
            { title: 'work_order_type', value: 'utility:work_order_type' },
            {
                title: 'workforce_engagement',
                value: 'utility:workforce_engagement'
            },
            { title: 'world', value: 'utility:world' },
            { title: 'your_account', value: 'utility:your_account' },
            { title: 'yubi_key', value: 'utility:yubi_key' },
            { title: 'zoomin', value: 'utility:zoomin' },
            { title: 'zoomout', value: 'utility:zoomout' }
        ]
    },
    {
        title: 'Doctype',
        value: 'doctype',
        icons: [
            { title: 'ai', value: 'doctype:ai' },
            { title: 'attachment', value: 'doctype:attachment' },
            { title: 'audio', value: 'doctype:audio' },
            { title: 'box_notes', value: 'doctype:box_notes' },
            { title: 'csv', value: 'doctype:csv' },
            { title: 'eps', value: 'doctype:eps' },
            { title: 'excel', value: 'doctype:excel' },
            { title: 'exe', value: 'doctype:exe' },
            { title: 'flash', value: 'doctype:flash' },
            { title: 'folder', value: 'doctype:folder' },
            { title: 'gdoc', value: 'doctype:gdoc' },
            { title: 'gdocs', value: 'doctype:gdocs' },
            { title: 'gform', value: 'doctype:gform' },
            { title: 'gpres', value: 'doctype:gpres' },
            { title: 'gsheet', value: 'doctype:gsheet' },
            { title: 'html', value: 'doctype:html' },
            { title: 'image', value: 'doctype:image' },
            { title: 'keynote', value: 'doctype:keynote' },
            { title: 'library_folder', value: 'doctype:library_folder' },
            { title: 'link', value: 'doctype:link' },
            { title: 'mp4', value: 'doctype:mp4' },
            { title: 'overlay', value: 'doctype:overlay' },
            { title: 'pack', value: 'doctype:pack' },
            { title: 'pages', value: 'doctype:pages' },
            { title: 'pdf', value: 'doctype:pdf' },
            { title: 'ppt', value: 'doctype:ppt' },
            { title: 'psd', value: 'doctype:psd' },
            { title: 'quip_doc', value: 'doctype:quip_doc' },
            { title: 'quip_sheet', value: 'doctype:quip_sheet' },
            { title: 'quip_slide', value: 'doctype:quip_slide' },
            { title: 'rtf', value: 'doctype:rtf' },
            { title: 'slide', value: 'doctype:slide' },
            { title: 'stypi', value: 'doctype:stypi' },
            { title: 'txt', value: 'doctype:txt' },
            { title: 'unknown', value: 'doctype:unknown' },
            { title: 'video', value: 'doctype:video' },
            { title: 'visio', value: 'doctype:visio' },
            { title: 'webex', value: 'doctype:webex' },
            { title: 'word', value: 'doctype:word' },
            { title: 'xml', value: 'doctype:xml' },
            { title: 'zip', value: 'doctype:zip' }
        ]
    },
    {
        title: 'Action',
        value: 'action',
        icons: [
            { title: 'add_contact', value: 'action:add_contact' },
            { title: 'add_file', value: 'action:add_file' },
            { title: 'add_photo_video', value: 'action:add_photo_video' },
            { title: 'add_relationship', value: 'action:add_relationship' },
            { title: 'adjust_value', value: 'action:adjust_value' },
            { title: 'announcement', value: 'action:announcement' },
            { title: 'apex', value: 'action:apex' },
            { title: 'approval', value: 'action:approval' },
            { title: 'back', value: 'action:back' },
            { title: 'bug', value: 'action:bug' },
            { title: 'call', value: 'action:call' },
            { title: 'canvas', value: 'action:canvas' },
            { title: 'change_owner', value: 'action:change_owner' },
            { title: 'change_record_type', value: 'action:change_record_type' },
            { title: 'check', value: 'action:check' },
            { title: 'clone', value: 'action:clone' },
            { title: 'close', value: 'action:close' },
            { title: 'defer', value: 'action:defer' },
            { title: 'delete', value: 'action:delete' },
            { title: 'description', value: 'action:description' },
            { title: 'dial_in', value: 'action:dial_in' },
            { title: 'download', value: 'action:download' },
            { title: 'edit_groups', value: 'action:edit_groups' },
            { title: 'edit_relationship', value: 'action:edit_relationship' },
            { title: 'edit', value: 'action:edit' },
            { title: 'email', value: 'action:email' },
            { title: 'fallback', value: 'action:fallback' },
            { title: 'filter', value: 'action:filter' },
            { title: 'flow', value: 'action:flow' },
            { title: 'follow', value: 'action:follow' },
            { title: 'following', value: 'action:following' },
            { title: 'freeze_user', value: 'action:freeze_user' },
            { title: 'goal', value: 'action:goal' },
            { title: 'google_news', value: 'action:google_news' },
            { title: 'info', value: 'action:info' },
            { title: 'join_group', value: 'action:join_group' },
            { title: 'lead_convert', value: 'action:lead_convert' },
            { title: 'leave_group', value: 'action:leave_group' },
            { title: 'log_a_call', value: 'action:log_a_call' },
            { title: 'log_event', value: 'action:log_event' },
            { title: 'manage_perm_sets', value: 'action:manage_perm_sets' },
            { title: 'map', value: 'action:map' },
            { title: 'more', value: 'action:more' },
            { title: 'new_account', value: 'action:new_account' },
            { title: 'new_campaign', value: 'action:new_campaign' },
            { title: 'new_case', value: 'action:new_case' },
            { title: 'new_child_case', value: 'action:new_child_case' },
            { title: 'new_contact', value: 'action:new_contact' },
            { title: 'new_event', value: 'action:new_event' },
            { title: 'new_group', value: 'action:new_group' },
            { title: 'new_lead', value: 'action:new_lead' },
            { title: 'new_note', value: 'action:new_note' },
            { title: 'new_notebook', value: 'action:new_notebook' },
            { title: 'new_opportunity', value: 'action:new_opportunity' },
            { title: 'new_person_account', value: 'action:new_person_account' },
            { title: 'new_task', value: 'action:new_task' },
            { title: 'new', value: 'action:new' },
            { title: 'password_unlock', value: 'action:password_unlock' },
            { title: 'preview', value: 'action:preview' },
            { title: 'priority', value: 'action:priority' },
            {
                title: 'question_post_action',
                value: 'action:question_post_action'
            },
            { title: 'quote', value: 'action:quote' },
            { title: 'recall', value: 'action:recall' },
            { title: 'record', value: 'action:record' },
            { title: 'refresh', value: 'action:refresh' },
            { title: 'reject', value: 'action:reject' },
            {
                title: 'remove_relationship',
                value: 'action:remove_relationship'
            },
            { title: 'remove', value: 'action:remove' },
            { title: 'reset_password', value: 'action:reset_password' },
            { title: 'scan_disabled', value: 'action:scan_disabled' },
            { title: 'scan_enabled', value: 'action:scan_enabled' },
            { title: 'script', value: 'action:script' },
            { title: 'share_file', value: 'action:share_file' },
            { title: 'share_link', value: 'action:share_link' },
            { title: 'share_poll', value: 'action:share_poll' },
            { title: 'share_post', value: 'action:share_post' },
            { title: 'share_thanks', value: 'action:share_thanks' },
            { title: 'share', value: 'action:share' },
            { title: 'sort', value: 'action:sort' },
            {
                title: 'submit_for_approval',
                value: 'action:submit_for_approval'
            },
            { title: 'update_status', value: 'action:update_status' },
            { title: 'update', value: 'action:update' },
            { title: 'upload', value: 'action:upload' },
            { title: 'user_activation', value: 'action:user_activation' },
            { title: 'user', value: 'action:user' },
            { title: 'view_relationship', value: 'action:view_relationship' },
            { title: 'web_link', value: 'action:web_link' }
        ]
    }
];

export { ICON_TYPES };

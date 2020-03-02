trigger AccountTrigger on Account (before insert) {
    if(Trigger.isBefore){
        AccountTriggerHelper.sendEmail(Trigger.new);
    }
}
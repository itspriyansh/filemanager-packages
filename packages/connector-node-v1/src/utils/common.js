export function normalizeResource(resource) {
  let splits = resource.name.split('.');
  if(splits.length > 1 && splits[splits.length-1]==='drive'){
    splits.pop();
    resource.name = splits.join('.');
    resource.type = 'drive';
  }
  if (resource) {
    return {
      capabilities: resource.capabilities,
      createdTime: Date.parse(resource.createdTime),
      id: resource.id,
      modifiedTime: Date.parse(resource.modifiedTime),
      name: resource.name,
      type: resource.type,
      size: resource.size,
      parentId: resource.parentId ? resource.parentId : null,
      ancestors: resource.ancestors ? resource.ancestors : null,
      driveLink: resource.driveLink ? resource.driveLink : null
    };
  } else {
    return {};
  }
}
